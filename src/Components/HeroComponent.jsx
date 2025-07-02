import { useState } from 'react'
import Hero from '../assets/hero.jpeg'
export default function HeroComponent(){
    let pathname='/'
    
    console.log()
    return(
    <>
    <section  className={pathname==='/' ? 'w-full md:h-[30rem] z-50  block' : 'hidden'}>
        <img src={Hero} alt="" className='w-full h-full opacity-[0.5]'/>
        <div className='max-w-screen-xl  mx-auto p-4 w-full absolute top-[9rem] bg-[#0000002e] '>
            <h1 className='!bg-transparent  text-center self-center md:!text-[3rem] !text-[2rem]  text-red-500 font-semibold whitespace-nowrap'>Hello</h1>
            <span></span>
        </div>
    </section>
    </>)}