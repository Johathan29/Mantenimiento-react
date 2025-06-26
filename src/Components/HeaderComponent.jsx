import React from "react";
import logo from '../assets/react.svg'

export default function HeaderComponent(){
    
return(
<>
<header className="rounded-lg shadow-sm bg-white m-0 w-full ">
  <nav className="bg-white fixed w-full max-h z-20 top-0 start-0 border-b-[8px] border-b-[#09aed642] ">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse ">
            <img src={logo} className="h-8 logo animate-spin" alt="Solutions Supports"/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-[#00718d]">Solutions Supports</span>
        </a>
        <button type="button" className="text-[#00718d] !text-[12px] md:!text-[14px] absolute top-[3px] right-[4px] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  rounded-lg text-[12px] px-4 py-[2px]">Get started</button>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse mr-[-9px]">
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-[34px] h-[34px] justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
        <div className="items-center justify-between z-40 hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white bg-gray-800 ">
                <li>
                    <a href="#" className="block py-2 px-3 text-[#00718d] bg-blue-700 rounded-sm md:bg-transparent hover:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-[#00718d] dark:hover:bg-gray-700 dark:hover:text-[#00718d] md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-[#00718d] dark:hover:bg-gray-700 dark:hover:text-[#00718d] md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-[#00718d] dark:hover:bg-gray-700 dark:hover:text-[#00718d] md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</header>
</>
)

    
}