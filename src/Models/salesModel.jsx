import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase/congif.js";

const salesCollection = collection(db, "Sales");
const productsCollection = collection(db, "Products");

export const salesModel = {
  // 🔹 Obtener todas las ventas
  async getAll() {
    const snapshot = await getDocs(salesCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  // 🔹 Crear venta y actualizar stock de productos
  async create(saleData) {
    try {
      const productos = saleData.productos; // Array con los productos vendidos [{id, nombre, cantidad}, ...]

      // 1️⃣ Crear la venta en la colección "Sales"
      const docRef = await addDoc(salesCollection, saleData);
      console.log("✅ Venta registrada con ID:", docRef.id);

      // 2️⃣ Actualizar el stock de cada producto vendido
      for (const item of productos) {
        console.log(typeof item.id)
        const productRef = doc(db, "Products", item.id);
        const productSnap = await getDocs(productRef);
        console.log(productRef)
        if (productSnap.exists()) {
          const productData = productSnap.data();
        
          const stockActual = productData.Amount ?? 0;
          const stockNuevo = Math.max(stockActual - item.cantidad, 0);

          await updateDoc(productRef, { Amount: stockNuevo });

          console.log(
            `📦 Producto: ${item.nombre} | Stock actualizado: ${stockActual} → ${stockNuevo}`
          );
        } else {
          console.warn(`⚠️ Producto no encontrado: ${item.id}`);
        }
      }

      return {
        id: docRef.id,
        message: "✅ Venta creada y stock actualizado correctamente",
      };
    } catch (error) {
      console.error("❌ Error al registrar venta:", error.message);
      throw error;
    }
  },

  // 🔹 Eliminar una venta
  async remove(id) {
    await deleteDoc(doc(db, "Sales", id));
    return id;
  },
};
