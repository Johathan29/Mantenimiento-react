import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth}  from "../Firebase/congif";
import api from "../Services/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
const decreaseQuantity = async (productId) => {
  if (!user) return;

  // Busca el producto actual
  const product = cart.find((p) => p.id === productId.id);
  if (!product) return;

  // Si la cantidad es 1 → eliminar producto
  if (product.quantity <= 1) {
    await removeFromCart(productId);
  } else {
    try {
      const res = await api.put(`/cart/${user.uid}/${productId}`, {
        quantity: product.quantity - 1,
      });
      setCart(res.data.items);
    } catch (err) {
      console.error("Error al disminuir cantidad:", err);
    }
  }
};
  // Detectar sesión de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await loadCart(currentUser.uid);
      } else {
        setCart([]);
      }
    });
    return unsubscribe;
  }, []);

  const loadCart = async (userId) => {
    try {
      setLoading(true);
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Error al cargar carrito:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      alert("Debes iniciar sesión para agregar productos.");
      return;
    }

    const res = await api.post(`/cart`, {
      userId: user.uid,
      product: { ...product, quantity: 1 },
    });

    setCart(res.data.items);
  };
 const removeToCart = async (productId) => {
    if (!user) {
      alert("Debes iniciar sesión para agregar productos.");
      return;
    }

   await api.delete(`/cart/${productId}`);
    await loadCart(user.uid);
   

    setCart(res.data.items);
  };
  const removeFromCart = async (productId) => {
    if (!user) return;
    await api.delete(`/cart/${user.uid}/${productId}`);
    await loadCart(user.uid);
  };

  const clearCart = async () => {
    if (!user) return;
    await api.delete(`/cart/${user.uid}`);
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ user, cart, loading, addToCart, removeFromCart, clearCart,removeToCart,decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
