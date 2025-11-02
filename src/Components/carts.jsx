import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { motion } from "framer-motion";
import notImg from "../assets/not-img.png";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { salesController } from "../Controllers/salesController";
import { db } from "../Firebase/congif.js";

export default function CartView() {
  const { cart, removeFromCart, reducirToCart, clearCart, loading, addToCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || { displayName: "Invitado" };

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="rounded-xl w-full max-w-md bg-white flex justify-center shadow-xl p-8">
          <p className="text-black text-2xl font-medium">
            Cargando carrito<span className="dots"></span>
          </p>
        </div>
      </div>
    );

  // ⚙️ Procesar venta y actualizar inventario
const handleCreateSale = async () => {
  const productosSeleccionados = cart.filter((item) =>
    selectedItems.includes(item.id)
  );

  if (!productosSeleccionados.length) {
    alert("Selecciona al menos un producto para registrar la venta");
    return;
  }

  // 🧮 Calcular totales
  const subtotal = productosSeleccionados.reduce(
    (acc, p) => acc + p.Price * p.quantity,
    0
  );
  const impuesto = subtotal * 0.18;
  const total = subtotal + impuesto;

  const saleData = {
    cliente: user?.displayName,
    idClient: user?.uid,
    productos: productosSeleccionados.map((item) => ({
      id: item.id,
      nombre: item.Name,
      cantidad: item.quantity,
      precio: item.Price,
      impuesto: (item.Price * item.quantity * 0.18).toFixed(2),
    })),
    metodo_pago: "Efectivo",
    subtotal: subtotal.toFixed(2),
    impuesto: impuesto.toFixed(2),
    total: total.toFixed(2),
  };

  try {
    const newSale = await salesController.addSales(saleData);

    // 🧹 Limpiar carrito solo de los vendidos
    const remainingItems = cart.filter(
      (item) => !selectedItems.includes(item.id)
    );
    clearCart();
    remainingItems.forEach((item) => addToCart(item));
    setSelectedItems([]);

    alert(`✅ Venta registrada correctamente. ID: ${newSale.id}`);
  } catch (error) {
    alert(error.message || "Error al registrar la venta");
  }
};

  // 🧮 Totales generales
  const subtotal = cart.reduce((acc, item) => acc + item.Price * (item.quantity || 1), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;
  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-hero-gradient min-h-screen">
      <div className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="!bg-transparent text-3xl md:text-4xl font-bold text-white mb-2">
              Carrito de Compras
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-200 text-sm">
              <p>{cart.length} item{cart.length !== 1 && "s"} en tu carrito</p>
              <span className="hidden sm:block">•</span>
              <p>{quantity} producto{quantity !== 1 && "s"} en total</p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link
              to="/products"
              className="font-semibold rounded-xl flex items-center gap-2 px-5 py-2 !bg-white !text-[#00a6f4] border border-[#00a6f4] hover:!bg-[#00a6f4] hover:!text-white transition-all duration-300 group"
            >
              <i className="fa-solid fa-arrow-left group-hover:-translate-x-4"></i>
              <span>Seguir comprando</span>
            </Link>
          </motion.div>
        </div>

        {/* 🛒 Contenido */}
        {cart.length === 0 ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="rounded-xl w-full max-w-md bg-white flex justify-center shadow-xl p-8">
              <p className="text-black text-2xl font-medium text-center">No hay productos en tu carrito.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="rounded-lg bg-card text-card-foreground shadow-xl border border-white/10">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Imagen */}
                      <div className="flex-shrink-0 mx-auto sm:mx-0 w-full sm:w-32 md:w-40">
                        <img
                          src={item.imagen || notImg}
                          alt={item.Name}
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      </div>

                      {/* Información */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg md:text-xl mb-1 text-white truncate">{item.Name}</h3>
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">{item.Description}</p>

                        {/* Controles */}
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => {
                              if (item.quantity <= 1) {
                                if (window.confirm("¿Deseas eliminar este producto del carrito?")) reducirToCart(item);
                              } else {
                                reducirToCart(item);
                              }
                            }}
                            className="bg-white text-[#00a6f4] border border-[#00a6f4] hover:bg-[#00a6f4] hover:text-white h-5 w-5 rounded-full flex items-center justify-center"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </motion.button>

                          <span className="font-semibold text-lg text-white min-w-[3ch] text-center">
                            {item.quantity || 1}
                          </span>

                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => addToCart(item)}
                            className="bg-white text-[#00a6f4] border border-[#00a6f4] hover:bg-[#00a6f4] hover:text-white h-5 w-5 rounded-full flex items-center justify-center"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </motion.button>

                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => {
                              if (window.confirm("¿Deseas eliminar este producto del carrito?")) removeFromCart(item.id);
                            }}
                            className="text-red-500 hover:text-red-700 ml-2 flex items-center justify-center bg-transparent"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </motion.button>

                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={(e) =>
                              e.target.checked
                                ? setSelectedItems([...selectedItems, item.id])
                                : setSelectedItems(selectedItems.filter((id) => id !== item.id))
                            }
                            className="accent-[#00a6f4] w-5 h-5"
                          />

                          <p className="ml-auto text-sm sm:text-base text-white w-auto grid space-y-0 font-semibold">
                            <span className="text-[#00a6f4] text-lg !mt-0">
                              {formatCurrency(item.Price * (item.quantity || 1))}
                            </span>
                            <span className="text-xs font-bold text-gray-300 -mt-1">
                              {formatCurrency(item.Price)} <span className="text-xs mr-1">US</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 🧾 Resumen */}
            <div className="lg:col-span-1">
              <div className="rounded-lg bg-purple-700/60 backdrop-blur-md border border-white/20 shadow-xl sticky top-6">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-2xl font-semibold text-white">Resumen de Compra</h3>
                </div>

                <div className="p-6 space-y-4 text-gray-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-black">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="text-black">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className="text-[#00a6f4]">Gratis</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-[#00a6f4]">{formatCurrency(total)} US</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex flex-col gap-3">
                  <button
                    onClick={handleCreateSale}
                    disabled={!selectedItems.length}
                    className={`w-full text-white border border-[#00a6f4] shadow-lg rounded-lg text-lg py-2.5 flex items-center justify-center gap-3 transition-all duration-300 ${
                      !selectedItems.length
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#00a6f4] hover:bg-white hover:text-[#00a6f4]"
                    }`}
                  >
                    <i className="fa-solid fa-bag-shopping"></i>
                    Proceder al Pago
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full text-[#00a6f4] bg-white border border-[#00a6f4] hover:bg-[#00a6f4] hover:text-white shadow-lg rounded-lg text-lg py-2.5 flex items-center justify-center gap-3 transition-all duration-300"
                  >
                    <i className="fa-solid fa-trash"></i>
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
