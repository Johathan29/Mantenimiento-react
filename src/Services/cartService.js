import { getFirestore, doc, collection, setDoc, getDoc, updateDoc, increment,deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

/**
 * Agregar un producto al carrito del usuario
 * @param {string} userId - UID del usuario
 * @param {object} product - Objeto del producto { id, name, price, image }
 * @param {number} quantity - Cantidad a agregar (por defecto 1)
 */
export const addToCart = async (userId, product, quantity = 1) => {
  if (!userId) throw new Error("User not logged in");

  const cartItemRef = doc(db, "carts", userId, "items", product.id.toString());
  const cartItemSnap = await getDoc(cartItemRef);

  if (cartItemSnap.exists()) {
    // Si ya existe el producto, aumentar cantidad
    await updateDoc(cartItemRef, {
      quantity: increment(quantity),
    });
  } else {
    // Si no existe, crear nuevo
    await setDoc(cartItemRef, {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image || null,
      quantity: quantity,
      createdAt: new Date(),
    });
  }

  return { success: true };
};

export const getCartItems = async (userId) => {
  if (!userId) throw new Error("User not logged in");

  const itemsRef = collection(db, "carts", userId, "items");
  const snapshot = await getDocs(itemsRef);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};



export const removeFromCart = async (userId, productId) => {
  if (!userId) throw new Error("User not logged in");

  const cartItemRef = doc(db, "carts", userId, "items", productId.toString());
  await deleteDoc(cartItemRef);

  return { success: true };
};
