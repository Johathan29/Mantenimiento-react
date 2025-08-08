import React, { useDebugValue, useEffect, useRef, useState } from 'react';
import logo from '../assets/react.svg';
import HeroComponent from './HeroComponent';
import { Link, NavLink } from 'react-router-dom';
import CounterNotifique from '../Hooks/counterNotifique';
import avatar from '../assets/users.png';
export default function HeaderComponent() {
  let {data}=CounterNotifique();
  console.log(data)
  const [user,getUser]=useState([])
  const dataUser=[{
    email:"rosariojohathan@gmail.com",
    iduser:2,
    imagen:"https://dummyjson.com/icon/michaelw/128",
    keyToken:"U2FsdGVkX19TWOw5MBWLsDUeHS9bs2I2BeEYj1SfOAQ=",
    nombre:"michael",
    password:"Michael1234$",
    profesión:"Developer",
    rol:"admin",
    statu: true
  }]
  useEffect(()=>{
    getUser(dataUser)
  },[])
  const navegation = [
    {
      id: 1,
      title: 'Home',
      pathname: '/',
      LinkActive: false,
    },
    
    {
      id: 2,

      title: 'Users',
      pathname: '/users',
      LinkActive: false,
    },
    {
      id: 3,

      title: 'Inbox',
      pathname: '/inbox',
      LinkActive: false,
    },
    {
      id: 4,

      title: 'Contact',
      pathname: '/contact_page',
      LinkActive: false,
    },
  ];

console.log(dataUser)
  var active = '';

  return (
    <>
      <header
        className={
          'rounded-lg shadow-sm bg-transparent m-0 w-full relative z-50  top-0 header'
        }
        id="header"
      >
        <nav className="bg-transparent  w-full  z-20 top-0 start-0 border-b-[8px] border-b-[#09aed642] ">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between md:mx-auto">
            <Link to="/" className="flex items-center gap-[0.5rem]  ">
              <img
                src={logo}
                className="h-8 logo animate-spin"
                alt="Solutions Supports"
              />
              <span className="self-center md:text-2xl text-xl md:relative absolute  md:left-[0px] left-[5rem] font-semibold whitespace-nowrap dark:text-[#00718d]">
                Solutions Supports
              </span>
            </Link>
            <div className='flex items-center gap-2  absolute top-[3px] right-[4px] '>
            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className='!text-[18px] !text-[#00718d] hover:!bg-white hover:!border-[0px] !border-[0px] md:!text-[18px]  !p-[0rem] top-[3px] right-[5rem] !bg-transparent hover:!bg-[#00718d] hover:!p-0 h-max z-20 focus:ring-[0px] focus:!outline-none focus:ring-blue-300 font-medium  rounded-lg text-[12px] px-4 py-[2px]'>
              <i className="fa-solid fa-globe  "></i>
              <sup className="text-sm text-red-500 font-bold" id='notifiqueNumber'></sup>
              </button>
              <div id="dropdownNavbar" className="-translate-x-[5.4rem] -translate-y-[0.8rem]  z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 ">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownLargeButton" id='nav-Notificaciones'>
                  <li>
                    <a href="#" className="block px-4 py-2">Dashboard</a>
                  </li>
                </ul>
                </div>
              <button
                type="button"
                className="text-[#00718d] !text-[12px] md:!text-[14px] md:!p-[0.5rem] !p-[0.2rem] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  rounded-lg text-[12px] px-4 py-[2px]"
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
            </div>
            <div
              className="items-center justify-between z-40 hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <div className='w-full px-[4rem] border-b-[1px] bg-gray-100 border-b-gray-200 block md:hidden py-2'>
                {user.map((item)=>(
                  <div className=' order-2 items-end flex md:hidden '>
                    <div  className='gap-0 order-2 items-end flex md:hidden '>
                      <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown-1" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer" src={item.statu===true ? item.imagen : avatar} alt="User dropdown"/>
                      <span className={item.statu===true ? "top-[-1.7rem] right-[0.5rem] relative  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full": "top-[-1.7rem] right-[0.5rem] relative  w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"}></span>
                      <i className="fa-solid fa-caret-down text-[12px] text-[#0000008c] mx-[-0.5rem] relative right-[0.9rem]"></i>
                    </div>
              <div id="userDropdown-1" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <h2>{item.nombre}</h2>
                      <div className="font-medium truncate">{item.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                    </div>
                </div>
                </div>
                ))}
              </div>
              
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white bg-gray-300 ">
                {navegation.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.pathname}
                      className={
                        'block py-2 px-3 text-[#00718d] rounded-sm md:bg-transparent hover:!text-white hover:bg-[#01718d8f] md:p-[0.5rem] '
                      }
                      aria-current="page"
                    >
                      {item.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div> 
            {user.map((item)=>(   
              <div className=' order-2 hidden md:flex'>
            <div className='gap-0 order-2 items-end flex'>
            <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer" src={item.statu===true ? item.imagen : avatar} alt="User dropdown"/>
                      <span className={item.statu===true ? "top-[-1.7rem] right-[0.5rem] relative  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full": "top-[-1.7rem] right-[0.5rem] relative  w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"}></span>
                      <i className="fa-solid fa-caret-down text-[12px] text-[#0000008c] mx-[-0.5rem] relative right-[0.9rem]"></i>
            </div>
            <div id="userDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
            
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>Bonnie Green</div>
              <div className="font-medium truncate">name@flowbite.com</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
              </li>
            </ul>
            <div className="py-1">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
            </div>
          </div>
          </div>
            ))}

          </div>
        </nav>
              </header>
    </>
  );
}
