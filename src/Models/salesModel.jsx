import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/congif.js";

const salesCollection = collection(db, "sales");
const productsCollection = collection(db, "Products");

export const salesModel = {

  // 🧾 Obtener todas las ventas
  async getAll() {
    const snapshot = await getDocs(salesCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  // 💰 Crear una venta y actualizar inventario
  async create(saleData) {
    try {
      // 1️⃣ Registrar la venta
      const docRef = await addDoc(salesCollection, saleData);
      console.log(`✅ Venta registrada con ID: ${docRef.id}`);

      // 2️⃣ Actualizar inventario de cada producto vendido
      for (const producto of saleData.productos) {
        const productRef = doc(db, "Products", producto.id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const data = productSnap.data();
          const nuevaCantidad = (data.Amount || 0) - producto.cantidad;

          // Evita que baje de 0
          await updateDoc(productRef, { Amount: nuevaCantidad < 0 ? 0 : nuevaCantidad });
          console.log(`📉 Stock actualizado para ${data.Name}: ${nuevaCantidad}`);
        } else {
          console.warn(`⚠️ Producto con ID ${producto.id} no encontrado en Firebase.`);
        }
      }

      return { id: docRef.id, ...saleData };
    } catch (error) {
      console.error("❌ Error al registrar venta:", error);
      throw new Error("No se pudo registrar la venta ni actualizar el inventario");
    }
  },

  // ❌ Eliminar una venta
  async remove(id) {
    await deleteDoc(doc(db, "sales", id));
    return id;
  },
};
