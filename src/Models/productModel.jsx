import { collection, getDocs, addDoc, deleteDoc, doc ,setDoc, updateDoc} from "firebase/firestore";
import { db } from "../Firebase/congif.js";

const productCollection = collection(db, "Products");
const res = await getDocs(productCollection);

export const productModel = {
  // getting all product
  async getAll() {
    const snapshot = await getDocs(productCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  // create product
  async create(codigo,product) {
    const docRef = await addDoc(productCollection, product);
    
    return { id: codigo, ...product };
  },
    // update product
    async update(id,product) {
       const docRef = doc(db, "Products", id);
    await updateDoc(docRef, product);
    
    return { id:id, ...product };
    },

  // delete product
  async remove(id) {
   
    const querySnapshot = await getDocs(collection(db, "Products"));
    querySnapshot.filter((doc) => {
      // Aquí doc.id es el ID del DOCUMENTO, no de la colección.
      
      console.log( doc.data().id ===id ? doc.id : '');
    });
    return id;
  }
};
