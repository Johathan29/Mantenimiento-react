import { useEffect } from "react";

export default function ContactPage(){
    useEffect(() => {
        document.title = 'Contact Page';
      }, []);
    return(
        <>
        <h1 className="p-[2rem] text-gray-500 ">Contact</h1>
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
        </>
    )
}