import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase/congif"; // ajusta la ruta si tu export se llama distinto
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
/**
 * Checkout completo:
 * - Stripe (PaymentIntent) + PayPal (client-side SDK)
 * - Guarda orden en Firestore
 * - Muestra animación de success
 * - Limpia carrito usando clearCart()
 *
 * Requisitos:
 * - Tener endpoints backend:
 *    POST /api/create-payment-intent  -> { clientSecret }
 *    POST /api/paypal/create-order   -> { id }
 *    POST /api/paypal/capture-order  -> { captureResult }
 *
 * - Asegúrate de tener firebase inicializado y exportado como `db`.
 */

export default function Checkout() {
  const { cart,clearCart } = useCart();
  const navigate = useNavigate();
const user=JSON.parse(localStorage.getItem('user'))
  // ⚠ Si no hay usuario, redirigir
  if (!user) {
    window.location.href = "/login";
    return null;
  }
  // Form state (envío)
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateProv, setStateProv] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  // Payment state
  const [method, setMethod] = useState("card"); // 'card' | 'paypal'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Totals
  const subtotal = useMemo(
    () => cart.reduce((s, p) => s + p.Price * p.quantity, 0),
    [cart]
  );
  const delivery = subtotal > 100 ? 0 : 5; // ejemplo: envío gratis sobre 100
  const taxRate = 0.21; // 21%
  const tax = +(subtotal * taxRate).toFixed(2);
  const total = +(subtotal + delivery + tax).toFixed(2);

  useEffect(() => {
    if (!user) {
      // si no hay usuario, redirigir al login
      navigate("/login");
    }
  }, [user, navigate]);

  // ---------- HELPERS ----------
  const showError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 4000);
  };

  // Guardar orden en Firestore (antes o después del pago según tu política)
  const saveOrderToFirestore = async (paymentInfo = {}) => {
    try {
      const orderDoc = {
        userId: user.uid,
        userEmail: user.email,
        items: cart.map((it) => ({
          id: it.id,
          name: it.Name,
          price: it.Price,
          quantity: it.quantity,
          imagen: it.imagen,
        })),
        subtotal,
        delivery,
        tax,
        total,
        address: { address, city, stateProv, zip, phone },
        paymentInfo,
        createdAt: serverTimestamp(),
        status: "paid",
      };
      const docRef = await addDoc(collection(db, "orders"), orderDoc);
      return docRef.id;
    } catch (err) {
      console.error("Save order error:", err);
      // No lanzar error, pero retornar null
      return null;
    }
  };


const generateInvoicePDF = async (orderId) => {
  const pdf = new jsPDF();

  // -------- HEADER --------
  pdf.setFontSize(18);
  pdf.text("COMPROBANTE FISCAL", 14, 20);

  pdf.setFontSize(12);
  pdf.text(`Factura No: ${orderId}`, 14, 30);
  pdf.text(`Fecha: ${new Date().toLocaleString()}`, 14, 37);

  pdf.text(`Cliente: ${user.displayName || user.email}`, 14, 45);

  // -------- QR CODE --------
  const qrDataURL = await QRCode.toDataURL(`ORDER:${orderId}`);

  pdf.addImage(qrDataURL, "PNG", 150, 10, 40, 40);

  // -------- TABLE --------
  const rows = cart.map((item) => [
    item.Name,
    item.quantity,
    item.Price.toFixed(2) + " €",
    (item.Price * item.quantity).toFixed(2) + " €",
  ]);

  autoTable(pdf, {
    head: [["Producto", "Cant", "Precio", "Total"]],
    body: rows,
    startY: 60,
  });

  // -------- TOTALS --------
  const finalY = pdf.lastAutoTable.finalY + 10;

  pdf.text(`Subtotal: ${subtotal.toFixed(2)} €`, 14, finalY);
  pdf.text(`Envío: ${delivery.toFixed(2)} €`, 14, finalY + 7);
  pdf.text(`ITBIS (18%): ${tax.toFixed(2)} €`, 14, finalY + 14);
  pdf.text(`TOTAL: ${total.toFixed(2)} €`, 14, finalY + 25);

  // -------- SAVE --------
  pdf.save(`Factura-${orderId}.pdf`);
};

  // ---------- STRIPE FLOW ----------
  // Nota: usa tu backend para crear PaymentIntent y devolver clientSecret
  const handleStripePayment = async () => {
    setProcessingPayment(true);
    try {
      // 1) Llamar a tu backend para crear PaymentIntent
      const { data } = await axios.post("/api/create-payment-intent", {
        amount: Math.round(total * 100), // en cents
        currency: "EUR",
        metadata: {
          userId: user.uid,
          cart: JSON.stringify(cart),
        },
      });

      const clientSecret = data.clientSecret;
      if (!clientSecret) throw new Error("No client secret from server.");

      // 2) Cargar Stripe.js y confirmar payment (frontend)
      // Aquí usamos la librería stripe-js cargada dinámicamente
      const stripeJs = await import("@stripe/stripe-js");
      // Reemplaza PUBLIC_STRIPE_PK por tu publishable key en .env
      const stripe = await stripeJs.loadStripe(process.env.REACT_APP_STRIPE_PK);

      // Puedes abrir Stripe Elements o usar confirmCardPayment con datos guardados (aquí uso redirect simplificado)
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          // Para demo usamos el método "card" en modo automatico
          // -> En producción debes montar Elements y recoger datos de tarjeta
        },
      });

      if (error) {
        console.error("Stripe error:", error);
        showError(error.message || "Payment failed");
        setProcessingPayment(false);
        return;
      }

      // Si llegamos aquí, pago confirmado
      const savedId = await saveOrderToFirestore({
        provider: "stripe",
        paymentIntentId: paymentIntent?.id ?? null,
      });

      setOrderId(savedId || paymentIntent?.id || "stripe_local");
      setOrderComplete(true);
      clearCart();
    } catch (err) {
      console.error("Stripe flow error:", err);
      showError("Error procesando el pago con Stripe.");
    } finally {
      setProcessingPayment(false);
    }
  };

  // ---------- PAYPAL FLOW ----------
  // Insertar SDK PayPal si se selecciona PayPal
  useEffect(() => {
    if (method !== "paypal") return;
    if (document.getElementById("paypal-sdk")) return; // ya agregado

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    // REEMPLAZA CLIENT_ID por tu client id en .env o backend
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=EUR`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // opcional: no removemos para acelerar futuras cargas
    };
  }, [method]);

  // Render PayPal Buttons
  useEffect(() => {
    if (method !== "paypal") return;
    if (!window.paypal) return;

    // Limpia contenedor previo
    const container = document.getElementById("paypal-buttons-container");
    if (!container) return;
    container.innerHTML = "";

    window.paypal.Buttons({
      style: { layout: "vertical", color: "blue", shape: "pill", label: "pay" },

      createOrder: async (data, actions) => {
        // Llamada a backend para crear la orden en PayPal
        try {
          const res = await axios.post("/api/paypal/create-order", {
            total: total,
            currency: "EUR",
            items: cart,
            userId: user.uid,
          });
          return res.data.id;
        } catch (err) {
          console.error("PayPal create-order error:", err);
          showError("No se pudo crear la orden PayPal.");
          throw err;
        }
        setOrderId(savedId || paymentIntent?.id);
setOrderComplete(true);
await generateInvoicePDF(savedId || paymentIntent?.id);
clearCart();
      },

      onApprove: async (data, actions) => {
        setProcessingPayment(true);
        try {
          // Capturar la orden en backend (o usar actions.order.capture())
          const captureRes = await axios.post("/api/paypal/capture-order", {
            orderId: data.orderID,
          });

          // Guardar orden en Firestore
          const savedId = await saveOrderToFirestore({
            provider: "paypal",
            orderId: data.orderID,
            capture: captureRes.data,
          });

          setOrderId(savedId || data.orderID);
          setOrderComplete(true);
          clearCart();
        } catch (err) {
          console.error("PayPal capture error:", err);
          showError("Error al completar el pago con PayPal.");
        } finally {
          setProcessingPayment(false);
        }
      },

      onError: (err) => {
        console.error("PayPal Buttons error:", err);
        showError("Error en PayPal.");
      },
    }).render("#paypal-buttons-container");
  }, [method, cart, user, total]);

  // ---------- SUBMIT HANDLER (forma fallback para tarjeta) ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validaciones basicas
    if (!address || !city || !zip || !phone) {
      showError("Completa todos los datos de envío.");
      return;
    }
    if (cart.length === 0) {
      showError("Tu carrito está vacío.");
      return;
    }

    if (method === "card") {
      await handleStripePayment();
    } else if (method === "paypal") {
      // Show paypal buttons where user can click
      // (no hacemos nada aquí porque PayPal Buttons se encarga)
      const el = document.getElementById("paypal-buttons-container");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        showError("Error con PayPal. Intenta de nuevo.");
      }
    }
  };

  // ---------- RENDER ----------
  if (!user) return null; // redirigido en useEffect

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left / Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="rounded-lg bg-white shadow p-6">
            <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2 text-sky-800">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              Información de contacto
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input label="Nombre" value={user.displayName || ""} disabled />
              <Input label="Email" value={user.email || ""} disabled />
            </div>
          </div>

          <div className="rounded-lg bg-white shadow p-6">
            <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2 text-sky-800">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none">
                <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              Dirección de envío
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm  text-gray-500 font-bold">Dirección *</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Calle Principal, 123" className="mt-1 w-full px-3 py-2 rounded border border-gray-200 text-gray-500" />
              </div>

              <div>
                <label className="text-sm  text-gray-500 font-bold">Ciudad *</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Madrid" className="mt-1 w-full px-3 py-2 rounded border border-gray-200 text-gray-500" />
              </div>

              <div>
                <label className="text-sm  text-gray-500 font-bold">Provincia *</label>
                <input value={stateProv} onChange={(e) => setStateProv(e.target.value)} placeholder="Madrid" className="mt-1 w-full px-3 py-2 rounded border border-gray-200 text-gray-500" />
              </div>

              <div>
                <label className="text-sm  text-gray-500 font-bold">Código Postal *</label>
                <input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="28001" className="mt-1 w-full px-3 py-2 rounded border border-gray-200 text-gray-500" />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm  text-gray-500 font-bold">Teléfono *</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+34 600 000 000" className="mt-1 w-full px-3 py-2 rounded border border-gray-200 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className="rounded-lg bg-white shadow p-6">
            <h3 className="text-2xl font-semibold mb-4 text-sky-900">Método de pago</h3>

            <div className="grid gap-3">
              <label className={`p-4 rounded border cursor-pointer text-gray-500 ${method === "card" ? "border-primary bg-primary/5" : ""}`}>
                <input type="radio" name="method" className="mr-2" checked={method === "card"} onChange={() => setMethod("card")} /> Tarjeta de Crédito / Débito
              </label>

              <label className={`p-4 rounded border cursor-pointer text-gray-500 ${method === "paypal" ? "border-primary bg-primary/5" : ""}`}>
                <input type="radio" name="method" className="mr-2" checked={method === "paypal"} onChange={() => setMethod("paypal")} /> PayPal
              </label>

              {/* PayPal buttons container (renderizado por SDK) */}
              {method === "paypal" && <div id="paypal-buttons-container" className="mt-2" />}
            </div>
          </div>
          {method === "card" && (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    <div className="md:col-span-2">
      <label className="text-sm text-gray-500 font-bold">Nombre en la tarjeta *</label>
      <input
        placeholder="Juan Pérez"
        className="mt-1 w-full px-3 py-2 rounded border border-gray-200 text-gray-700"
        required={method === "card"}
      />
    </div>

    <div>
      <label className="text-sm text-gray-500 font-bold">Número de tarjeta *</label>
      <input
        placeholder="4242 4242 4242 4242"
        className="mt-1 w-full px-3 py-2 rounded border border-gray-200 text-gray-700"
        required={method === "card"}
      />
    </div>

    <div>
      <label className="text-sm text-gray-500 font-bold">Expiración (MM/YY) *</label>
      <input
        placeholder="12/28"
        className="mt-1 w-full px-3 py-2 rounded border border-gray-200 text-gray-700"
        required={method === "card"}
      />
    </div>

    <div>
      <label className="text-sm text-gray-500 font-bold">CVC *</label>
      <input
        placeholder="123"
        className="mt-1 w-full px-3 py-2 rounded border border-gray-200 text-gray-700"
        required={method === "card"}
      />
    </div>
  </motion.div>
)}

          {/* Botón Pagar */}
          <div className="flex items-center gap-4">
            <button type="submit" disabled={processingPayment || loading} className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-800 rounded font-semibold shadow hover:opacity-95">
              {processingPayment ? "Procesando..." : `Pagar ${total.toFixed(2)} €`}
            </button>

            <button type="button" onClick={() => navigate("/catalog")} className="px-4 py-3 border rounded">
              Volver al catálogo
            </button>

            {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}
          </div>
        </form>

        {/* Right / Summary */}
        <aside className="space-y-4">
          <div className="rounded-lg bg-white shadow p-6 sticky top-6">
            <h4 className="font-semibold text-lg mb-4">Resumen del Pedido</h4>

            <div className="space-y-3 max-h-56 overflow-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img src={item.imagen || "/not-img.png"} alt={item.Name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <div className=" text-sm line-clamp-1">{item.Name}</div>
                    <div className="text-xs text-gray-500">Cantidad: {item.quantity}</div>
                  </div>
                  <div className="font-semibold">{(item.Price * item.quantity).toFixed(2)} €</div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-3 space-y-2 text-gray-700">
              <div className="flex justify-between"><span>Subtotal</span><span>{subtotal.toFixed(2)} €</span></div>
              <div className="flex justify-between"><span>Envío</span><span>{delivery.toFixed(2)} €</span></div>
              <div className="flex justify-between"><span>IVA (21%)</span><span>{tax.toFixed(2)} €</span></div>
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{total.toFixed(2)} €</span></div>
            </div>
          </div>

          <div className="rounded-lg bg-white shadow p-4 text-center">
            <div className="text-sm text-gray-500">Pago 100% seguro y encriptado</div>
          </div>
        </aside>
      </div>

      {/* Success / Order Complete modal / screen */}
      <AnimateSuccess
        open={orderComplete}
        orderId={orderId}
        onClose={() => {
          setOrderComplete(false);
          navigate("/orders"); // ir a orders o catalog
        }}
      />
    </div>
  );
}

/* ---------- Small components ---------- */

function Input({ label, placeholder, value, disabled = false, onChange }) {
  return (
    <div>
      <label className="text-sm  text-gray-500 font-bold">{label}</label>
      <input
        className={`mt-1 w-full px-3 py-2 rounded border border-gray-200 text-gray-500 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

function AnimateSuccess({ open, orderId, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-xl p-8 w-[90%] max-w-md text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <svg className="w-14 h-14 text-green-500" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.div>

        <h3 className="text-xl font-semibold mb-2">Pago realizado con éxito</h3>
        <p className="text-sm text-gray-600 mb-4">Tu pedido ha sido procesado correctamente.</p>
        {orderId && <p className="text-xs text-gray-500 mb-4">ID de orden: <code className="bg-slate-100 px-2 py-1 rounded text-sm">{orderId}</code></p>}

        <div className="flex gap-3 justify-center">
          <button onClick={onClose} className="px-4 py-2 bg-cyan-500 text-white rounded">Ver mis órdenes</button>
          <button onClick={() => (window.location.href = "/")} className="px-4 py-2 border rounded">Volver al catálogo</button>
        </div>
      </motion.div>
    </div>
  );
}
