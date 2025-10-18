import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile, updateEmail, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function FormUpdateUsers() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Detectar usuario autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        setEmail(currentUser.email);
        setDisplayName(currentUser.displayName || "");
        const localUser = JSON.parse(localStorage.getItem("user"));
        setPhoneNumber(localUser?.phoneNumber || "");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  // Escuchar cambios de usuario global
  useEffect(() => {
    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      if (updatedUser) {
        setUser(updatedUser);
        setEmail(updatedUser.email);
        setDisplayName(updatedUser.displayName);
        setPhoneNumber(updatedUser.phoneNumber);
      }
    };
    window.addEventListener("userUpdated", handleUserUpdate);
    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);

  // Ocultar alerta automáticamente
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // Función para subir la foto al servidor
  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("photo", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error subiendo la imagen");
    return `/uploads/users/${data.filename}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setAlert({ type: "error", text: "❌ No hay usuario logueado" });

    setLoading(true);
    setAlert(null);

    try {
      const db = getFirestore();
      let photoURL = user.photoURL;

      // Subir foto si hay archivo
      if (photoFile) {
        photoURL = await uploadPhoto(photoFile);
      }

      // Actualizar email si cambió
      if (email && email !== user.email) {
        await updateEmail(user, email);
      }

      // Actualizar Firebase Auth
      await updateProfile(user, { displayName, photoURL });

      // Guardar en Firestore
      const updatedData = {
        uid: user.uid,
        email,
        displayName,
        phoneNumber,
        photoURL,
        updatedAt: new Date(),
      };

      await setDoc(doc(db, "users", user.uid), updatedData, { merge: true });

      // Actualizar localStorage y estado
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("userUpdated"));
      setUser(updatedUser);

      setAlert({ type: "success", text: "✅ Perfil actualizado correctamente" });
    } catch (error) {
      console.error(error);
      setAlert({ type: "error", text: "❌ Error al actualizar el perfil: " + error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-6">
      {/* Alerta flotante */}
      <AnimatePresence>
        {alert && (
          <motion.div
            key={alert.text}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${
              alert.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {alert.text}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100"
      >
        <div className="flex flex-col items-center mb-6">
          {user?.photoURL ? (
            <motion.img
              key={user.photoURL}
              src={user.photoURL}
              alt="Perfil"
              className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md mb-3"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl font-bold shadow-md mb-3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {displayName ? displayName.charAt(0).toUpperCase() : "U"}
            </motion.div>
          )}
          <h2 className="text-xl font-semibold text-gray-800">{displayName || "Usuario"}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block mb-1 text-sm font-medium text-gray-700">Nombre</label>
            <input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block mb-1 text-sm font-medium text-gray-700">Teléfono</label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500"
              placeholder="+1 809 000 0000"
            />
          </div>

          <div>
            <label htmlFor="photoURL" className="block mb-1 text-sm font-medium text-gray-700">Nueva foto de perfil</label>
            <input
              id="photoURL"
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-all disabled:opacity-50"
          >
            {loading ? "Actualizando..." : "Actualizar"}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </motion.form>
    </div>
  );
}
