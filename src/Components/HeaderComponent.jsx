import React, { useDebugValue, useEffect, useRef, useState } from 'react';
import logo from '../assets/react.svg';
import HeroComponent from './HeroComponent';
import { Link, NavLink } from 'react-router-dom';

export default function HeaderComponent() {
  const navegation = [
    {
      id: 1,
      title: 'Home',
      pathname: '/',
      LinkActive: false,
    },
    {
      id: 2,

      title: 'Contact',
      pathname: '/contact',
      LinkActive: false,
    },
    {
      id: 3,

      title: 'Users',
      pathname: '/users_all',
      LinkActive: false,
    },
  ];

  console.log(navegation.length);

  var active = '';

  return (
    <>
      <header
        className={
          'rounded-lg shadow-sm bg-transparent m-0 w-full relative z-20  top-0 header'
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
            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className='!text-[18px] !text-[#00718d] hover:!bg-white hover:!border-[0px] !border-[0px] md:!text-[18px]  !p-[0rem] top-[3px] right-[5rem] !bg-transparent hover:!bg-[#00718d] hover:!p-0 h-max focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  rounded-lg text-[12px] px-4 py-[2px]'>
              <i className="fa-solid fa-globe  "></i>
              <sup className="text-sm text-red-500 font-bold">8</sup>
              </button>
              <div id="dropdownNavbar" class="transform-[translate3d(-9rem, 25px, 0px)] z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 ">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownLargeButton">
                  <li>
                    <a href="#" class="block px-4 py-2">Dashboard</a>
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
          </div>
        </nav>
      </header>
    </>
  );
}
