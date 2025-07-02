import React, { useRef, useState } from "react";
import Logo from '../assets/react.svg'
export default function FooterComponent(){
    const [date, setDate] = useState(new Date());
return(
<>
<footer className={'rounded-lg shadow-sm bg-white m-0 w-full  z-20  relative bottom-0 h-auto border-t-[8px] border-t-[#09aed642]'}>
    <div className="w-full max-w-screen-xl md:mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src={Logo} className="h-[54px] w-[54px]" alt="Flowbite Logo" />
                <h1 className="self-center md:text-2xl !text-xl md:relative absolute  md:left-[0px] left-[5rem] font-semibold whitespace-nowrap text-[#00718d]">Solutions Supports</h1>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="block py-2 px-3 text-[#00718d] rounded-sm md:bg-transparent hover:!text-white hover:bg-[#01718d8f] md:p-[0.5rem]">About</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-[#00718d] rounded-sm md:bg-transparent hover:!text-white hover:bg-[#01718d8f] md:p-[0.5rem]">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-[#00718d] rounded-sm md:bg-transparent hover:!text-white hover:bg-[#01718d8f] md:p-[0.5rem]">Licensing</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-3 text-[#00718d] rounded-sm md:bg-transparent hover:!text-white hover:bg-[#01718d8f] md:p-[0.5rem]">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center ">© {date.getFullYear()} <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
</footer>
</>
)
    
}