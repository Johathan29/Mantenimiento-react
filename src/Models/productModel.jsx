import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/congif";

const productCollection = collection(db, "Products");

export const productModel = {
  // getting all product
  async getAll() {
    const snapshot = await getDocs(productCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  // create product
  async create(product) {
    const docRef = await addDoc(productCollection, product);
    return { id: docRef.id, ...product };
  },

  // delete product
  async remove(id) {
    await deleteDoc(doc(db, "product", id));
    return id;
  }
};
