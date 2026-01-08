import React, { useEffect, useState } from 'react';
import logo from '../assets/react.svg';
import { Link, NavLink } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { initFlowbite } from 'flowbite';
import { motion, AnimatePresence } from 'framer-motion';
import PathLocation from '../hooks/Location';
import MiniCart from './MiniCart';
import UserMenu from './UserMenu'; // tu componente existente

export default function HeaderComponent() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const path = PathLocation();

  // Firebase
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    databaseURL: import.meta.env.VITE_databaseURL,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
    measurementId: import.meta.env.VITE_measurementId,
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    initFlowbite();
    (async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const docs = querySnapshot.docs.map((d) => d.data());
      setUsers(docs);
    })();
  }, [db]);

  const navegation = [
    { id: 1, title: "Home", pathname: "/" },
   // { id: 2, title: "Collaborators", pathname: "/our_collaborators" },
    { id: 3, title: "About", pathname: "/about" },
    { id: 4, title: "Product", pathname: "/products" },
    { id: 5, title: "Contact", pathname: "/contact" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -30, height: 0 },
    visible: { opacity: 1, y: 0, height: "auto" },
    exit: { opacity: 0, y: -30, height: 0 },
  };

  return (
    <header className="rounded-lg shadow-sm bg-transparent m-0 w-full relative z-20 top-0">
      <nav
        className={
       
            "bg-hero-gradient w-full "
        }
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3 md:px-4 py-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="h-8 animate-spin" alt="Logo" />
            <span
              className={
                
                   "!text-[2.2rem] !text-white font-semibold"
              }
            >
              Solutions <span class="!text-sky-500"> Supports</span>
            </span>
          </Link>

          {/* Botón menú móvil */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
            className="inline-flex items-center p-2 w-[38px] h-[38px] justify-center text-sm text-gray-500 !outline-none !border-0 !bg-transparent rounded-lg md:hidden hover:bg-gray-100 focus:!outline-none"
          >
            <span className="sr-only">Toggle menu</span>
            <i className={`fa-solid ${menuOpen ? "fa-xmark text-red-500" : "fa-bars"} text-lg`} />
          </button>

          {/* Menú escritorio */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <ul className="flex flex-row items-center space-x-6">
              {navegation.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.pathname}
                    className=
                      "block !p-0  rounded-sm transition !font-bold  !text-[18px] text-white  hover:!text-sky-500  "
                     
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Avatar + carrito en escritorio */}
            <div className="flex items-center gap-4" id="avatar">
              <UserMenu
                users={users}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              /> 
              {currentUser==="" ? "" :
              <MiniCart />
}
            </div>
          </div>
        </div>

        {/* Menú móvil animado */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:hidden bg-transparent backdrop-blur-xl shadow-lg border-t border-gray-200/10 overflow-hidden"
            >
              <ul className="flex flex-col items-center gap-2 py-4">
                {navegation.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.pathname}
                      onClick={() => setMenuOpen(false)}
                      className="block !p-0  rounded-sm transition !font-bold  !text-[18px] text-white  hover:!text-sky-500 "
                    >
                      {item.title}
                    </NavLink>
                  </li>
                ))}

                {/* Avatar + carrito dentro del menú móvil */}
                <li className="w-full border-t border-gray-300/20 pt-4 mt-2 flex flex-col items-center gap-3">
                  <UserMenu
                    users={users}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                  {users==="" ? " ":
                  <MiniCart />
}
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
