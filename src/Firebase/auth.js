import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

export const loginUser = async (email, password) => {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken(); // 🔥 Token de Firebase
  
  // Enviar token al backend
  const res = await axios.post('http://localhost:5000/api/auth/', { token });
  return res.data;
};
