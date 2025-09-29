import React, { useEffect, useState } from 'react';
import logo from '../assets/react.svg';
import { Link, NavLink } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import avatarDefault from "../assets/users.png";
import PathLocation from '../Hooks/Location';

// ──────────────────────────────────────────────────────────────
// UserMenu
// ──────────────────────────────────────────────────────────────
function UserMenu({ users, currentUser, setCurrentUser }) {
  const handleLogin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataPost = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const foundUser = users.find(
      (u) => u.email === dataPost.email && u.password === dataPost.password
    );

    if (foundUser) {
      const updatedUser = { ...foundUser, statu: true };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    } else {
      alert("User incorrect");
    }
  };
 
  const handleSignOut = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const dropdownId = `userDropdown-${currentUser?.iduser ?? 'guest'}`;

  return (
    <div
      className="flex items-end gap-0 md:order-2 order-1 px-4 bg-[#bfeaf4] py-4 md:bg-transparent md:py-0 md:px-0"
      id="avatar"
    >
      <img
        id="avatarButton"
        type="button"
        data-dropdown-toggle={dropdownId}
        data-dropdown-placement="bottom-start"
        className="w-10 h-10 rounded-full cursor-pointer"
        src={currentUser?.statu ? currentUser.imagen : avatarDefault}
        alt="User avatar"
      />
      <span
        className={`relative top-[-1.7rem] right-[0.5rem] w-3.5 h-3.5 border-2 border-white rounded-full ${
          currentUser?.statu ? "bg-green-400" : "bg-red-400"
        }`}
      />
      <i className="fa-solid fa-caret-down text-[12px] text-[#0000008c] mx-[-0.5rem] relative right-[0.9rem]" />

      <div
        id={dropdownId}
        className="z-50 hidden divide-y divide-gray-100 rounded-lg shadow-sm bg-[#f3f4f6] w-auto"
      >
        {currentUser?.statu ? (
          <>
            <div className="px-4 py-3 text-sm !text-gray-900">
              <h2 className="font-[700] capitalize">{currentUser.nombre}</h2>
              <div className="font-medium truncate">{currentUser.email}</div>
            </div>
            <ul className="py-2 text-sm !text-gray-700">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-[#00718d9e] hover:!text-white"
                >
                  <i className="fa-solid fa-user" /> Your Profile
                </a>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-[#00718d9e] hover:!text-white"
                >
                  <i className="fa-solid fa-gear" /> Settings
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-[#00718d9e] hover:!text-white"
                >
                  Earnings
                </a>
              </li>
            </ul>
            <div className="py-1">
              <button
                onClick={handleSignOut}
                className="w-full text-left flex items-center justify-between !font-bold px-4 py-2 text-sm text-gray-700 hover:bg-[#00718d9e] hover:!text-white"
              >
                Sign out <i className="fa-solid fa-right-to-bracket" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 bg-[#f3f4f6] z-50">
            <form className="space-y-6" onSubmit={handleLogin}>
              <h5 className="text-xl font-[800] text-gray-900 text-center">
                Sign in
              </h5>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-[700] text-gray-700"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="!text-gray-700 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-[700] text-gray-700"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="!text-gray-700 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex items-start">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-white text-gray-50"
                />
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Remember me
                </label>
                <a href="#" className="ms-auto text-sm text-blue-700">
                  Lost Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5"
              >
                Login to your account
              </button>
              <div className="text-sm font-medium text-gray-500">
                Not registered?{" "}
                <a href="#" className="text-blue-700 hover:underline">
                  Create account
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// HeaderComponent
// ──────────────────────────────────────────────────────────────
export default function HeaderComponent() {
  // mensajes
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState({ id: "", state: false });

  // usuarios
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

 const path = PathLocation()
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

  // Firestore: traer usuarios una sola vez
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const docs = querySnapshot.docs.map((d) => d.data());
      setUsers(docs);
    })();
  }, [db]);

  // API mensajes
  const API = "http://localhost/api/";
  const id = 2;

  const getMessages = () => {
    fetch(API + "message/message.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error al obtener mensajes:", err));
  };

  // cargar mensajes una sola vez
  useEffect(() => {
    getMessages();
  }, []);

  const changeState = (item) => {
    setSelectedMessage({ id: item.id, state: true });
    // optimista: marcar leída en UI
    setMessages((prev) =>
      prev.map((m) => (m.id === item.id ? { ...m, state: true } : m))
    );

    fetch(API + "message/updatemessage.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, state: true }),
    })
      .then((res) => res.json())
      .then(() => getMessages())
      .catch((err) => console.error("Error al enviar:", err));
  };

  const navegation = [
    { id: 1, title: "Home", pathname: "/", LinkActive: false },
    { id: 2, title: "Collaborators", pathname: "/our_collaborators", LinkActive: false },
    { id: 3, title: "Inbox", pathname: "/inbox", LinkActive: false },
    { id: 4, title: "Product", pathname: "/products", LinkActive: false },
    { id: 5, title: "Contact", pathname: "/contact_page", LinkActive: false },
  ];

  const unreadCount = messages.filter((m) => !m.state).length;

  return (
    <header
      className="rounded-lg shadow-sm bg-transparent m-0 w-full relative z-20 top-0 header"
      id="header"
    >
      <nav className={path!== '/'?"bg-white w-full z-20 top-0 start-0 border-b-[8px] border-b-[#09aed642] ":"bg-[#00000047] w-full z-20 top-0 start-0 border-b-[8px] border-b-[#09aed642] "}>
        <div className="max-w-screen-xl flex flex-wrap items-center lg:justify-between md:mx-auto md:justify-start md:gap-[1rem]">
          <Link to="/" className="flex items-center gap-[0.5rem]">
            <img src={logo} className="h-8 logo animate-spin" alt="Solutions Supports" />
            <span className={path!== '/'?"self-center md:text-2xl text-xl !text-[#00718d] md:relative absolute md:left-[0px] left-[5rem] font-semibold whitespace-nowrap dark:text-[#00718d]":"self-center md:text-2xl text-xl !text-white md:relative lg:absolute md:left-[-2rem] left-[5rem] font-semibold whitespace-nowrap dark:text-[#00718d]"}>
              Solutions Supports
            </span>
          </Link>

          <div className="md:flex  items-center gap-2 absolute lg:top-[2rem] right-[4px] " id='car-shop'>
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              className="!text-[18px] !text-[#00718d]  !border-[0px] md:!text-[18px] !p-[0rem] top-[3px] right-[5rem] !bg-transparent hover:!bg-transparent hover:!p-0 h-max z-20 focus:ring-[0px] focus:!outline-none font-medium rounded-lg text-[12px] px-4 py-[2px]"
            >
              <i className="fa-solid fa-globe" />
              {unreadCount > 0 && (
                <sup className="text-sm text-red-500 font-bold"> {unreadCount}</sup>
              )}
            </button>

            <div
              id="dropdownNavbar"
              className="-translate-x-[5.4rem] -translate-y-[0.8rem] z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44"
            >
              <ul
                className="py-2 text-sm text-gray-700 bg-transparent"
                aria-labelledby="dropdownLargeButton"
                id="nav-Notificaciones"
              >
                {messages.map((item) => (
                  <li
                    key={item.id}
                    className={
                      item.state === false
                        ? "last:border-b-0 border-b-4 border-[#f9f9f97d] hover:bg-[#cce3eb] bg-[#cce3eb] active"
                        : "last:border-b-0 border-b-4 border-[#f9f9f97d] hover:bg-[#cce3eb] bg-transparent"
                    }
                  >
                    <Link
                      onClick={() => changeState(item)}
                      to={`inbox/messageID:${item.id}&&userID:${item.iduser}`}
                      className="block px-4 py-2 hover:!text-[#41474ceb] hover:!font-bold capitalize"
                    >
                      {item.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="text-[#00718d] !text-[12px] md:!text-[14px] md:!p-[0.5rem] !p-[0.2rem] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] px-4 py-[2px]"
            >
              Get started
            </button>
          </div>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse mr-[4px]">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-[34px] h-[34px] justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>

            <div id="avatar-original">
              <UserMenu
                users={users}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </div>
          </div>

          <div
            className="items-center justify-between z-40 hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul
              className="flex flex-col p-4 md:p-0 mt-4 font-medium md:rounded-lg bg-white lg:space-x-8 md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent bg-gray-300"
              id="navegation"
            >
              {navegation.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.pathname}
                    className={path!=='/'?"block py-2 px-3 !text-[1rem] text-[#00718d] rounded-sm md:bg-transparent hover:!text-white hover:bg-[#00718d] md:p-[0.5rem]":"block py-2 px-3 !text-[1rem] md:!text-white !text-[#00718b] rounded-sm md:bg-transparent hover:!text-white hover:bg-[#00718d] md:p-[0.5rem]"}
                    aria-current="page"
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
