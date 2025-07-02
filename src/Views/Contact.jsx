import { useEffect } from "react";

export default function ContactPage(){
    useEffect(() => {
        document.title = 'Contact Page';
      }, []);
    return(
        <>
        <h1 className="p-[2rem] text-gray-500 ">Contact</h1>
<<<<<<< HEAD
        <div className="md:flex block flex-wrap ">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d473.11948032824495!2d-70.03293972996113!3d18.440313943809237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea56186844561bf%3A0xfc43bea124928235!2sRepuesto%20y%20Gomera%20R%20%26%20O!5e0!3m2!1ses!2sdo!4v1751418899402!5m2!1ses!2sdo" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        < form className="rounded-lg bg-[#09aed642] p-[2rem] md:w-1/2">
            <div className="grid gap-6 mb-6 md:grid-cols-2 w-full ">
                <div>
                    <label  htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900">Email</label>
                    <input type="Email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="johnramirez@hotmail.com" required />
                </div>
                <div>
                    <label  htmlFor="first_last_name" className="block mb-2 text-sm font-bold text-gray-900">First Name and Last Name</label>
                    <input type="text" id="first_last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John Ramirez" required />
                </div>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-1 w-full ">
                <div>
                    <label  htmlFor="message" className="block mb-2 text-sm font-bold text-gray-900 ">Your message</label>
                    <textarea id="message" rows="4" className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                </div>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-1 w-full ">
                <button className="text-[16px] !font-bold hover:!bg-white relative bottom-[-6rem] w-max hover:!text-[#00718d] hover:!border-[1px] hover:!border-[#00718d]"> Send</button>

            </div>
        </ form>
        </div>
        
=======
        <form className="rounded-lg bg-[#09aed642] p-[2rem] md:w-1/2">
            <div class="grid gap-6 mb-6 md:grid-cols-2 w-full ">
                <div>
                    <label for="email" class="block mb-2 text-sm font-bold text-gray-900">Email</label>
                    <input type="Email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="johnramirez@hotmail.com" required />
                </div>
                <div>
                    <label for="first_last_name" class="block mb-2 text-sm font-bold text-gray-900">First Name and Last Name</label>
                    <input type="text" id="first_last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John Ramirez" required />
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-1 w-full ">
                <div>
                    <label for="message" class="block mb-2 text-sm font-bold text-gray-900 ">Your message</label>
                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                </div>
            </div>
            <button className="text-[16px] !font-bold hover:!bg-white hover:!text-[#00718d] hover:!border-[1px] hover:!border-[#00718d]"> Send</button>
        </form>
>>>>>>> 16d950ea618718884b2a6b9924ee3c6247e51ad6
        </>
    )
}