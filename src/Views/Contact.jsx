import { useEffect, useMemo, useState } from 'react';
//import CounterNotifique from '../Hooks/counterNotifique';
import dataMensaje from '../Data/dataMensaje.json'
import TitlePage from '../Controllers/TitlePage';
//import db from '../server/db'
export default function ContactPage() {
 //console.log(db)

  const [messagesSent, setMessagesSent] = useState([]);
  //const { data,counter } = CounterNotifique();
  //data.data=messagesSent;
  
  const send = (event) => {
    event.preventDefault(); // Prevenir recarga

    const data = new FormData(event.target);

    const dataPost = {
      email: data.get('email'),
      iduser: data.get('first_last_name'),
      message: data.get('message'),
    };
    fetch("http://localhost/api/message/addmessage.php", {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(dataPost),
          });
    setMessagesSent((prev) => [...prev, dataPost]);
  
    // Opcional: puedes limpiar el formulario si deseas
    event.target.reset();
    console.log(dataPost)
  };
  TitlePage()
  return (
    <>
       

      <h1 className="text-white !bg-transparent  w-full">Contact</h1>
      <hr className='border-t-[6px] rounded-[15px] text-[#ffffff66]'/>
      <div className="md:flex block flex-wrap py-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d473.11948032824495!2d-70.03293972996113!3d18.440313943809237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea56186844561bf%3A0xfc43bea124928235!2sRepuesto%20y%20Gomera%20R%20%26%20O!5e0!3m2!1ses!2sdo!4v1751418899402!5m2!1ses!2sdo"
          className="md:w-1/2 w-full h-[24rem]"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className='rounded-b-lg md:rounded-r-lg md:rounded-b-none  border-1 px-[2rem] md:w-1/2'>
          <h3 className='text-center !text-[1.5rem] md:p-0 p-0 font-[600] !text-black'>Contact us</h3>
          <span className='!text-center text-sm w-full text-black leading-[0px] mb-[2rem] block'>
          You can send us a message
          </span>

          <form onSubmit={send}>
            <div className="grid gap-6 mb-6 md:grid-cols-2 w-full">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="johnramirez@hotmail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="first_last_name" className="block mb-2 text-sm font-bold text-gray-900">
                  First Name and Last Name
                </label>
                <input
                  type="text"
                  name="first_last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="John Ramirez"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-sm font-bold text-gray-900">
                Your message
              </label>
              <textarea
                name="message"
                rows="4"
                className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your thoughts here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="text-[16px] font-bold hover:bg-white relative my-4 md:my-0 w-max hover:text-[#00718d] hover:border-[1px] hover:border-[#00718d]"
            >
             Send
            </button>
          </form>
        </div>
      </div>

      <ul className="text-white mt-8">
        {messagesSent.map((item, index) => (
          <li key={index}>{item.message}</li>
        ))}
      </ul>
    </>
  );
}
