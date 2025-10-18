import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/congif.js";

const usersCollection = collection(db, "users");

export const userModel = {
  // getting all users
  async getAll() {
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  // create user
  async create(user) {
    const docRef = await addDoc(usersCollection, user);
    return { id: docRef.id, ...user };
  },

  // delete user
  async remove(id) {
    await deleteDoc(doc(db, "users", id));
    return id;
  }
};
