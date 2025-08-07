import { useParams } from 'react-router-dom'
import data from '../Data/dataMensaje.json'
import { useState } from 'react'
import icon from '../assets/users.png'
import TitlePage from '../Controllers/TitlePage';

export default function MessageDetailPage() {
  const { id } = useParams(); // más limpio
  const messageId = parseInt(id[1]);
  
  // Buscar el mensaje actual
  const message = data.find((item) => item.id === messageId);

  // Buscar el remitente si existe
  const remitente = message?.remitente
    ? data.find((item) => item.id === message.remitente)
    : null;

  if (!message) {
    return <p className="text-white">Mensaje no encontrado.</p>;
  }

  return (
    <dl className="text-gray-900 divide-y divide-gray-200 !text-white dark:divide-gray-700">
      <div className="shadow-lg w-full rounded-md p-4">
        <div className="flex gap-2 items-center mb-4">
          <img src={icon} alt="User Icon" className="w-[3rem]" />
          
          <h1 className="text-white !bg-transparent font-bold !text-[2rem]">
            {remitente.first_last_name}
          </h1>
        </div>
        {remitente && (
          <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 bg-gray-100 rounded-e-xl rounded-es-xl mb-4">
            <p className="text-sm font-normal text-gray-900">{remitente.message}</p>
            <span className="text-sm font-normal text-gray-500">{remitente.date}</span>
          </div>
        )}
        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 bg-gray-100 rounded-br-xl rounded-s-lg mb-4 relative left-[17rem]">
          <p className="text-sm font-normal text-gray-900">{message.message}</p>
          <span className="text-sm font-normal text-gray-500">{message.date}</span>
        </div>

        <div className="px-4 py-4">
          <span className="font-bold text-base underline text-black">Responder:</span>
          <form className="block mt-2">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              className="w-full md:w-1/2 bg-white text-black h-[6rem] rounded-md px-4"
            />
            <div className="w-full py-4">
              <button className="w-max bg-blue-600 text-white px-4 py-2 rounded-md">
                Enviar mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </dl>
  );
}
