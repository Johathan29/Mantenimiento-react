import { collection, getDocs, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/congif.js";

const productCollection = collection(db, "Products");

export const productModel = {
  // Obtener todos los productos
  async getAll() {
    const snapshot = await getDocs(productCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  // Crear producto con ID personalizado (código)
  async create(codigo, product) {
    const docRef = doc(db, "Products", codigo);
    await setDoc(docRef, product);
    return { id: codigo, ...product };
  },

  // Actualizar producto
  async update(id, product) {
    const docRef = doc(db, "Products", id);
    await updateDoc(docRef, product);
    return { id, ...product };
  },

  // Eliminar producto
  async remove(id) {
    const docRef = doc(db, "Products", id);
    await deleteDoc(docRef);
    return id;
  },
};
