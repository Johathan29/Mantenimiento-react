import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/congif";
import api from "../Services/api";
import CartNotification from "../Components/Notification/CartNotification";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: null, type: "info" });

  // Mostrar notificación
  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: "info" }), 2500);
  };

  // Cargar carrito desde la API
  const loadCart = async (userId) => {
    try {
      setLoading(true);
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Error al cargar carrito:", err);
      showNotification("Error al cargar el carrito ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Añadir producto con actualización optimista
  const addToCart = async (product) => {

    // Actualización local instantánea
    setCart((prevCart) => {
      const existing = prevCart.find((p) => p.id === product.id);
      if (existing) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    showNotification(`${product.Name || "Producto"} agregado al carrito 🛒`, "success");

    // Sincronización backend
    try {
      const res = await api.post(`/cart`, {
        userId: user.uid,
        product: { ...product, quantity: 1 },
      });
      setCart(res.data.items);
    } catch (err) {
      console.error("Error al agregar producto:", err);
      showNotification("No se pudo agregar el producto ❌", "error");
    }
  };

  // ✅ Reducir cantidad con actualización instantánea
  const reducirToCart = async (product) => {
    if (!user) {
      alert("Debes iniciar sesión para modificar el carrito.");
      location.href = "/login";
      return;
    }

    setCart((prevCart) => {
      return prevCart
        .map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0);
    });

    showNotification(`Cantidad reducida de ${product.Name || "producto"} `, "warning");

    try {
      const res = await api.post(`/cart`, {
        userId: user.uid,
        product: { ...product, quantity: -1 },
      });
      setCart(res.data.items);
    } catch (err) {
      console.error("Error al reducir cantidad:", err);
      showNotification("No se pudo reducir la cantidad ❌", "error");
    }
  };

  // ✅ Eliminar producto con feedback instantáneo
  const removeFromCart = async (productId) => {
    if (!user) return;

    // Actualización local instantánea
    setCart((prevCart) => prevCart.filter((p) => p.id !== productId));
    showNotification("Producto eliminado del carrito 🗑️", "error");

    try {
      await api.delete(`/cart/${user.uid}/${productId}`);
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      showNotification("No se pudo eliminar el producto ❌", "error");
    }
  };

  // ✅ Vaciar carrito instantáneamente
  const clearCart = async () => {
    if (!user) return;

    setCart([]);
    showNotification("Carrito vaciado completamente 🧹", "info");

    try {
      await api.delete(`/cart/${user.uid}`);
    } catch (err) {
      console.error("Error al limpiar carrito:", err);
      showNotification("No se pudo limpiar el carrito ❌", "error");
    }
  };

  // Mantener sincronizado el carrito con el usuario autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(JSON.parse(localStorage.getItem("user")));
      if (currentUser) await loadCart(currentUser.uid);
      else setCart([]);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <CartContext.Provider
        value={{
          user,
          cart,
          loading,
          addToCart,
          removeFromCart,
          clearCart,
          reducirToCart,
        }}
      >
        {children}
      </CartContext.Provider>

      {/* 🔔 Notificación flotante superior */}
      <CartNotification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: null, type: "info" })}
      />
    </>
  );
}

export const useCart = () => useContext(CartContext);
