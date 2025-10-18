import React, { useEffect, useState } from 'react';
import logo from '../assets/react.svg';
import { Link, NavLink } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import avatarDefault from "../assets/users.png";
import PathLocation from '../hooks/Location';
import {initDropdowns} from 'flowbite'
import { loginUser,logoutUser,registerUser } from "../Services/authService";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ModalMsg from "../Components/utili/Modal";
import ImgProfile from './utili/img-profil'
// ──────────────────────────────────────────────────────────────
// UserMenu
// ──────────────────────────────────────────────────────────────
export default function FormLogin({ users, currentUser, setCurrentUser }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
const [modal, setModal] = useState({ show: false, title: "", message: "", type: "info" });
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
    const user = await loginUser(email, password); // <-- debe devolver un objeto

    //setCurrentUser(user);
    await fetchRole(user);
    console.log(JSON.parse(localStorage.getItem('user')))
    setEmail("");
    setPassword("");

    setModal({
      show: true,
      title: "Login successful!",
      message: `Welcome back ${user.displayName || user.email}!`,
      type: "success",
    });
  } catch (error) {
    if (error.message === "EMAIL_NOT_VERIFIED") {
      setModal({
        show: true,
        title: "Email not verified",
        message: "Please verify your email before logging in.",
        type: "warning",
      });
    } else {
      setModal({
        show: true,
        title: "Login error",
        message: error.code || "Unexpected error occurred",
        type: "error",
      });
    }
  }
};


  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setMsg("Passwords do not match");

    try {
      const user = await registerUser(email, password,name);
       setModal({
    show: true,
    title: "Registration successful!",
    message: "We sent a verification email. Please verify your account before logging in.",
    type: "success",
  });
      setShowRegister(false);
      setEmail(""); setPassword(""); setConfirm("");
    } catch (err) {
      setModal({
    show: true,
    title: "Registration failed",
    message: err.message || "Could not complete registration.",
    type: "error",
  });
    }
  };

  const handleSignOut = async () => {
    await logoutUser();
    setCurrentUser(null);
    localStorage.removeItem("user");
    setModal({
  show: true,
  title: "Signed out",
  message: "You have been logged out successfully.",
  type: "info",
});
  };

  useEffect(() => {
   
  }, [currentUser]);

 
  return (
    <>
    <ModalMsg
  show={modal.show}
  setShow={(show) => setModal({ ...modal, show })}
  title={modal.title}
  message={modal.message}
  type={modal.type}
/>
 
    <div
      className="flex justify-center  items-end gap-0 md:order-2 order-1  px-4 bg-hero-gradient py-4 md:bg-transparent md:py-[4rem] md:px-0 "
      id="avatar"
    >
      
      <div
       
        className="z-50  relative w-full max-w-md p-8 rounded-lg backdrop-blur-xl bg-white/10 border-white/20 shadow-lg  shadow-[#fdfeff63]"
        
      >
        {currentUser ? (
          <>
            <div className="px-4 py-3 text-sm text-gray-900">
              <h2 className="font-[700] capitalize">{currentUser.displayName || "User"}  {currentUser.role || "user"}</h2>
              <div className="font-medium truncate">{currentUser.email}</div>
            </div>
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-[#00718d9e] hover:text-white"
                >
                  <i className="fa-solid fa-user" /> Your Profile
                </a>
              </li>
              {currentUser.role==="admin" ? 
              <li>
                  <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-[#00718d9e] hover:text-white"
                >
                  <i className="fa-solid fa-gear" /> Settings
                </Link>
              </li>
              : ''
                }
            </ul>
            <div className="py-1">
              <button
                onClick={handleSignOut}
                className="w-full text-left flex items-center justify-between font-bold px-4 py-2 text-sm text-gray-700 hover:bg-[#00718d9e] hover:text-white"
              >
                Sign out <i className="fa-solid fa-right-to-bracket" />
              </button>
            </div>
          </>
        ) : (
           <AnimatePresence mode="wait">
  <motion.div
    key={showRegister ? "register-bg" : "login-bg"}
    initial={{ opacity: 0, filter: "blur(10px)" }}
    animate={{ opacity: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, filter: "blur(10px)" }}
    transition={{ duration: 0.4 }}
    className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-transparent z-0"
  />

  {showRegister ? (
    <motion.form
      key="register"
      initial={{ opacity: 0, x: 70, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -70, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 12,
        mass: 0.8,
      }}
      className="relative z-10 space-y-6 p-4 sm:p-6 md:p-8"
      onSubmit={handleRegister}
    >
      <h5 className="text-[2rem] font-[800] text-white text-center">Register</h5>

      {msg && <div className="text-center text-green-300 font-semibold">{msg}</div>}

      <div>
        <label className="block mb-2 text-sm font-[700] text-white">Email</label>
        <div className='relative flex'>   
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>    
          <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-4 text-base shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 transition-all duration-200"
          placeholder="name@company.com"
          required
        />
        </div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-[700] text-white">Name</label>
        <div className='relative'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-4 text-base shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 transition-all duration-200"
          placeholder="Nombre y Apellido"
          required
        />
        </div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-[700] text-white">Password</label>
        <div className='relative'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> 
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-4 text-base shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 transition-all duration-200"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-[700] text-white">Confirm Password</label>
        <div className='relative'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> 
          <input
          type="password"
          onChange={(e) => setConfirm(e.target.value)}
          value={confirm}
          className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-4 text-base shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 transition-all duration-200"
          required
        />
      </div>
    </div>

      <button
        type="submit"
        className="w-full text-white !bg-purple-300/10 hover:!text-white flex shadow-xl/30 items-center justify-center gap-[0.5rem] hover:!bg-purple-700  hover:!border-purple-600/40 rounded-lg !text-[1.2rem] px-5 py-2.5"
        style={{border:"1px solid!important"}}
      >
        Register <i className="fa-solid fa-user-plus"></i>
      </button>

      <div 
           className="text-sm font-medium !text-[#dbd9d9c4] hover:!text-white flex gap-2 hover:underline justify-center items-center cursor-pointer" 
           onClick={() => {
           setShowRegister(false);
           setMsg(null);
          }
        }>
        Already have an account? Login
        
      </div>
    </motion.form>
  ) : (
    <motion.form
      key="login"
      initial={{ opacity: 0, x: -70, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 70, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 12,
        mass: 0.8,
      }}
      className="relative z-10 space-y-6 "
      onSubmit={handleLogin}
    >
      <h5 className="text-2xl font-[800] text-white  !mb-0 ">
        Iniciar Sesión
      </h5>
      <span className='!mb-4 '>Ingresa tus credenciales para acceder a tu cuenta</span>
      {msg && <div className="text-center text-green-300 font-semibold">{msg}</div>}

      <div className='mt-6'>
        <label className="block mb-2 text-sm font-[700] text-white">Email</label>
       <div className='relative flex'>   
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>    
          <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-4 text-base shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 transition-all duration-200"
          placeholder="name@company.com"
          required
        />
        </div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-[700] text-white">Password</label>
        <div className='relative'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> 
          <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-4 text-base shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 transition-all duration-200"
          placeholder="••••••••"
          required
        />
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-white !bg-purple-300/10 hover:!text-white flex shadow-xl/30 items-center justify-center gap-[0.5rem] hover:!bg-purple-700  hover:!border-purple-600/40 rounded-lg !text-[1.2rem] px-5 py-2.5"
      >
        Login <i className="fa-solid fa-right-to-bracket"></i>
      </button>

      <div className="text-sm font-medium !text-[#dbd9d9c4] hover:!text-white flex gap-2 hover:underline justify-center items-center cursor-pointer"  onClick={() => {
            setShowRegister(true);
            setMsg(null);
          }}>
        Not registered? Create account
       
      </div>
    </motion.form>
  )}
</AnimatePresence>

  )}
  
      </div>
    </div>
    </>
  );
}
