import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import avatarDefault from "../assets/user-solid-full-home.svg";
import avatarDefault2 from "../assets/user-solid-full.svg";
import PathLocation from '../hooks/Location';
import { initFlowbite } from 'flowbite';
import { loginUser, logoutUser, registerUser } from "../Services/authService";
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ImgProfile from './utili/img-profil';
import MiniCart from './MiniCart';

export default function UserMenu({ users, currentUser, setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState(null);
  const [msgType, setMsgType] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const path = PathLocation();
  const db = getFirestore();
  const usersRef = collection(db, "users");
  const fetchRole = async (user) => {
    try {
      const idTokenResult = await user.getIdTokenResult(true);
      const role = idTokenResult.claims.role || null;
      setCurrentUser(prev => ({ ...prev, role }));
      localStorage.setItem("user", JSON.stringify({ ...user, role }));
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      setCurrentUser(user);
      unifyUserData(user)
      localStorage.setItem("user", JSON.stringify(user));
      await fetchRole(user);
      showNotification("✅ Sesión iniciada correctamente", "success");
      setEmail(""); setPassword("");
    } catch (error) {
      showNotification("⚠️ Error al iniciar sesión. Verifica tus credenciales.", "error");
    }
  };
// 🔗 Fusionar datos entre Auth y Firestore
const unifyUserData = async (authUser) => {
  try {
  
    const snapshot = await getDocs(usersRef);
    const userDoc = snapshot.docs.find(doc => doc.id === authUser.uid);

    const firestoreData = userDoc ? userDoc.data() : {};

    // 🔄 Combinar: prioridad al campo que no esté vacío
    const mergedUser = {
      ...firestoreData,
      ...authUser, // authUser sobreescribe si tiene datos válidos
    };

    // Si hay campos vacíos en auth pero llenos en Firestore, los usamos
    for (const key in firestoreData) {
      if (!mergedUser[key] || mergedUser[key] === "") {
        mergedUser[key] = firestoreData[key];
      }
    }

    setCurrentUser(mergedUser);
    localStorage.setItem("user", JSON.stringify(mergedUser));
    return mergedUser;
  } catch (error) {
    console.error("Error al unificar datos del usuario:", error);
  }
};

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) return showNotification("⚠️ Las contraseñas no coinciden.", "error");

    try {
      await registerUser(email, password, name);
       await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name: name,
      role: "user", // valor por defecto
      photoURL: user.photoURL || "",
      createdAt: new Date().toISOString(),
    });

      showNotification("✅ Registro exitoso. Ahora inicia sesión.", "success");
      setShowRegister(false);
      setEmail(""); setPassword(""); setConfirm("");
    } catch (err) {
      showNotification(err.message || "❌ Error al registrar usuario.", "error");
    }
  };

  const handleSignOut = async () => {
    await logoutUser();
    setCurrentUser(null);
    localStorage.removeItem("user");
    showNotification("👋 Sesión cerrada correctamente", "success");
  };

  const showNotification = (message, type) => {
    setMsg(message);
    setMsgType(type);
    setTimeout(() => {
      setMsg(null);
      setMsgType(null);
    }, 3000);
  };

  useEffect(() => {
    initFlowbite();
  }, [currentUser]);

  const dropdownId = `userDropdown-${currentUser?.uid ?? "guest"}`;

  return (
    <div className="flex items-center gap-2 px-4 py-3 relative z-50 md:py-0 md:px-0">

      {/* 🧍 Imagen de perfil */}
      <div className="relative flex items-center justify-center">
        <ImgProfile
          datadropdowntoggle={dropdownId}
          datadropdownplacement="bottom-start"
          className="w-10 h-10 md:w-11 md:h-11 object-cover rounded-full border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-105 duration-200"
          src={
            currentUser
              ? currentUser.photoURL
              : path !== '/'
                ? avatarDefault2
                : avatarDefault
          }
        />

        {/* 🔘 Indicador de estado */}
        <span
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${
            currentUser ? "bg-green-400" : "bg-red-400"
          }`}
        />
      </div>

      {/* Flecha de menú */}
      <i className="fa-solid fa-caret-down text-[12px] text-[#0000008c] ml-2" />

      {/* 🔽 Dropdown */}
      {PathLocation() !== "/login" ? (
        <div
          id={dropdownId}
          className={`hidden absolute top-[110%] right-0 w-[18rem] md:w-[20rem] p-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl ${
            currentUser ? "rounded-xl" : "rounded-[40%_1%]"
          }`}
        >
          {currentUser ? (
            <>
              <div className="px-4 py-3 text-sm text-gray-900">
                <h2 className="font-[700] capitalize !text-[#106c8b] !text-[1.2rem]">
                  {currentUser.displayName || "User"} {currentUser.role || "user"}
                </h2>
                <div className="!font-bold truncate text-gray-400">
                  {currentUser.email} {currentUser.phoneNumber}
                </div>
              </div>
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link
                    to="/form-update-user"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-[#00718d9e] hover:text-white rounded-md transition-all"
                  >
                    <i className="fa-solid fa-user" /> Perfil
                  </Link>
                </li>
                {currentUser.role === "admin" && (
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#00718d9e] hover:text-white rounded-md transition-all"
                    >
                      <i className="fa-solid fa-gear" /> Panel
                    </Link>
                  </li>
                )}
              </ul>
              <div className="py-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-between font-bold bg-red-500/80 px-4 py-2 text-sm text-white rounded-md hover:bg-red-700 transition-all"
                >
                  Cerrar sesión <i className="fa-solid fa-right-from-bracket" />
                </button>
              </div>
            </>
          ) : (
            <AnimatePresence mode="wait">
              {/* Tu código de login/register se mantiene igual */}
              {/* 🔥 Sin cambios para no alterar animaciones */}
               <motion.div key={showRegister ? "register-bg" : "login-bg"} initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(10px)" }} transition={{ duration: 0.4 }} className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-transparent" /> 
               {/* 🔐 FORMULARIOS */} {
               
               
               showRegister ? ( 
               <motion.form key="register" initial={{ opacity: 0, x: 70, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -70, scale: 0.9 }} transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.8 }} className="relative z-10 space-y-6 " onSubmit={handleRegister} > 
                <h5 className="text-[2rem] font-[800] text-white text-center">Register</h5> 
                <div> 
                  <label className="block mb-2 text-sm font-[700] text-white">Email</label> 
                  <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="text-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-transparent" placeholder="name@company.com" required /> 
                </div> 
                <div> 
                  <label className="block mb-2 text-sm font-[700] text-white">Name</label> 
                  <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="text-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-transparent" placeholder="Nombre y Apellido" required /> 
                </div> 
                <div> 
                  <label className="block mb-2 text-sm font-[700] text-white">Password</label> 
                  <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="text-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-transparent" required /> 
                </div> 
                <div> 
                  <label className="block mb-2 text-sm font-[700] text-white">Confirm Password</label> 
                  <input type="password" onChange={(e) => setConfirm(e.target.value)} value={confirm} className="text-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-transparent" required /> 
                  </div> 
                  <button type="submit" title='entrada de usuario' className="w-full text-white !bg-purple-300/10 shadow-xl !border-2 !border-purple-500/20 hover:!text-white hover:!bg-purple-700/40 rounded-lg !text-[1.2rem] px-5 py-2.5" > Register <i className="fa-solid fa-user-plus"></i> </button> <div className="text-sm font-medium text-[#dbd9d9c4] hover:text-white flex gap-2 hover:underline justify-center items-center cursor-pointer" onClick={() => { setShowRegister(false); setMsg(null); }} > Already have an account? Login </div> </motion.form> ) : ( <motion.form key="login" initial={{ opacity: 0, x: -70, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 70, scale: 0.9 }} transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.8 }} className="relative z-10 space-y-6 " onSubmit={handleLogin} > <h5 className="text-[2rem] font-[800] text-white text-center">Sign in</h5> <div> <label className="block mb-2 text-sm font-[700] text-white">Email</label> <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="text-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-transparent" placeholder="name@company.com" required /> </div> <div> <label className="block mb-2 text-sm font-[700] text-white">Password</label> <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="text-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-transparent" placeholder="••••••••" required /> </div> <button type="submit" className="w-full text-white !bg-purple-300/10 shadow-xl !border-2 !border-purple-500/20 hover:!text-white hover:!bg-purple-700/40 rounded-lg !text-[1.2rem] px-5 py-2.5" > Login <i className="fa-solid fa-right-to-bracket"></i> </button> <div className="text-sm font-medium text-white/40 hover:text-white flex gap-2 hover:underline justify-center items-center cursor-pointer" onClick={() => { setShowRegister(true); setMsg(null); }} > Not registered? Create account </div> </motion.form> )}
            </AnimatePresence>
          )}
        </div>
      ) : null}

      {/* 🔔 Notificación */}
      <AnimatePresence>
        {msg && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-6 right-6 px-5 py-3 rounded-xl shadow-xl text-white font-semibold backdrop-blur-md border border-white/20 z-[9999] ${
              msgType === "success" ? "bg-green-600/90" : "bg-red-600/90"
            }`}
          >
            {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
