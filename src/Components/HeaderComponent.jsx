import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";
import avatarDefault from "../assets/users.png";
import CounterNotifique from "../Hooks/counterNotifique";

// Componente para el menú de usuario
function UserMenu({ user, className }) {
  return (
    <div className={`flex items-end gap-0 md:order-2  order-1 ${className}`}>
      {/* Avatar y estado */}
      <img
        id="avatarButton"
        type="button"
        data-dropdown-toggle={`userDropdown-${user.iduser}`}
        data-dropdown-placement="bottom-start"
        className="w-10 h-10 rounded-full cursor-pointer"
        src={user.statu ? user.imagen : avatarDefault}
        alt="User avatar"
      />
      <span
        className={`relative top-[-1.7rem] right-[0.5rem] w-3.5 h-3.5 border-2 border-white rounded-full ${
          user.statu ? "bg-green-400" : "bg-red-400"
        }`}
      ></span>
      <i className="fa-solid fa-caret-down text-[12px] text-[#0000008c] mx-[-0.5rem] relative right-[0.9rem]"></i>

      {/* Dropdown */}
      <div
        id={`userDropdown-${user.iduser}`}
        className="z-10 hidden  divide-y divide-gray-100 rounded-lg shadow-sm w-44 bg-[#f3f4f6] dark:divide-gray-600"
      >
        {user.statu ? (
          <>
            <div className="px-4 py-3 text-sm !text-gray-900 ">
              <h2 className="font-[700] capitalize">{user.nombre}</h2>
              <div className="font-medium truncate">{user.email}</div>
            </div>
            <ul className="py-2 text-sm !text-gray-700 dark:text-gray-200">
              <li><a href="#" className="block px-4 py-2 hover:bg-[#00718d9e] dark:hover:bg-[#00718d9e] dark:hover:!text-white">Dashboard</a></li>
              <li><a href="#" className="block px-4 py-2 hover:bg-[#00718d9e] dark:hover:bg-[#00718d9e] dark:hover:!text-white">Settings</a></li>
              <li><a href="#" className="block px-4 py-2 hover:bg-[#00718d9e] dark:hover:bg-[#00718d9e] dark:hover:!text-white">Earnings</a></li>
            </ul>
            <div className="py-1">
              <a href="#" className="flex items-center justify-between !font-bold px-4 py-2 text-sm text-gray-700 hover:bg-[#00718d9e] dark:hover:bg-[#00718d9e] dark:text-gray-200 dark:hover:!text-white">
                Sign out <i className="fa-solid fa-right-to-bracket"></i>
              </a>
            </div>
          </>
        ) : (
          
        <div className="w-full max-w-sm p-4  border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 bg-[#f3f4f6]">
            <form className="space-y-6" action="#">
                <h5 className="text-xl font-medium text-gray-900 ">Sign in to our platform</h5>
                <div>
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 " placeholder="name@company.com" required />
                </div>
                <div>
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 " required />
                </div>
                <div className="flex items-start">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-white focus:ring-3 focus:ring-blue-300 " required />
                        </div>
                        <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                </div>
            </form>
        </div>

        )}
      </div>
    </div>
  );
}

export default function HeaderComponent() {
  const { data } = CounterNotifique();

  const [user] = useState([
    {
      email:"rosariojohathan@gmail.com",
    iduser:2,
    imagen:"https://dummyjson.com/icon/michaelw/128",
    keyToken:"U2FsdGVkX19TWOw5MBWLsDUeHS9bs2I2BeEYj1SfOAQ=",
    nombre:"michael",
    password:"Michael1234$",
    profesión:"Developer",
    rol:"admin",
    statu: false
    },
  ]);

  const navigation = [
    { id: 1, title: "Home", pathname: "/" },
    { id: 2, title: "Users", pathname: "/users" },
    { id: 3, title: "Inbox", pathname: "/inbox" },
    { id: 4, title: "Contact", pathname: "/contact_page" },
  ];

  return (
    <header className="rounded-lg shadow-sm bg-transparent w-full relative z-50">
      <nav className="bg-transparent w-full border-b-[8px] border-b-[#09aed642] p-[2rem]">
        <div className="max-w-screen-xl flex flex-wrap gap-2 items-center justify-around mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mt-[1rem]">
            <img src={logo} className="h-8 animate-spin" alt="Logo" />
            <span className="md:text-2xl text-xl font-semibold text-[#00718d]">Solutions Supports</span>
          </Link>

          {/* Notificaciones */}
          <div className="flex items-center gap-2 absolute top-[3px] right-[4px]">
            <button className="icon-btn">
              <i className="fa-solid fa-globe"></i>
              <sup id="notifiqueNumber" className="text-sm text-red-500 font-bold"></sup>
            </button>
            <button className="btn-primary text-xs md:text-sm">Get started</button>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <button data-collapse-toggle="navbar-sticky" className="menu-btn">
              <svg className="w-5 h-5" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          {/* Navegación */}
          <div id="navbar-sticky" className="hidden md:flex items-center gap-6 w-full md:w-auto mt-[1rem] md:order-1">
            <ul className="flex flex-col md:flex-row gap-[0.5rem] md:gap-[0.2rem] font-medium ">
              {navigation.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.pathname}
                    className={({ isActive }) =>
                      `py-2 px-3 rounded-sm ${
                        isActive
                          ? "bg-[#01718d] !text-white"
                          : "text-[#00718d] hover:!bg-[#01718d8f] hover:!text-white"
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Menú de usuario */}
            {user.map((u) => (
              <UserMenu key={u.iduser} user={u} />
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
