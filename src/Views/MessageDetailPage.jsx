import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import icon from '../assets/users.png'
import dateFormat from 'dateformat';
export default function MessageDetailPage() {
  const { id } = useParams();
  const [message, setMessages] = useState([]);
  const idactual = localStorage.getItem("iduser");
  const messageId = parseInt(id.replace(/\D/g, ''), 10);
const iduser=messageId.toString().split('')[1];
  const API = "http://localhost/api/";
console.log(iduser)
  const getUsers = () => {
    fetch(API + "message/detailsmessage.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ iduser: iduser, iduserreceptor: idactual }),
    })
      .then((res) => res.json())
      .then(setMessages)
      .catch((err) => console.error("Error al obtener mensajes:", err));
  };
const setMessage=(event)=>{
 const data = new FormData(event.target);

const date = new Date();

const formattedDate = dateFormat(date, "yyyy-mm-dd HH:MM TT");
  fetch(API + "message/addmessage.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ iduser: iduser, iduserreceptor: idactual,message:data.get('message'),date:formattedDate,state:false }),
    })
      .then((res) => res.json())
      .then(setMessages)
      .catch((err) => console.error("Error al obtener mensajes:", err));
alert(formattedDate);
}
  useEffect(() => {
    getUsers();
  }, []);

  if (!message || message.length === 0) {
    return <p className="text-white">Mensaje no encontrado.</p>;
  }

  const remitente = message.find((item) => item.iduser != idactual);
  const receptor = message.find((item) => item.iduser == idactual);
console.log(receptor.iduser)
  return (
    <dl className="text-gray-900 divide-y divide-gray-200 !text-white dark:divide-gray-700">
      <div className="shadow-lg w-full rounded-md p-4">
        <div className="flex gap-2 items-center mb-4">
          <img src={'data:image/jpeg;base64,'+receptor.avatar} alt="User Icon" className="w-[3rem]" />
          <h1 className="text-white !bg-transparent font-bold !text-[2rem]">
            { receptor?.nombre || 'Desconocido'}
          </h1>
        </div>

        {remitente && (
          <div className="flex flex-col w-full max-w-[320px] bg-gray-100 rounded-e-xl rounded-es-xl mb-4">
            <p className="text-md font-normal text-gray-900 p-[0.9rem] remitente">{remitente.message}</p>
            <span className="text-sm font-normal text-gray-500 p-[0.3rem] text-end">{dateFormat(remitente.date, "dd-mm-yyyy HH:MM TT")}</span>
          </div>
        )}

        <div className='flex relative md:left-[19rem]'>
          <div className="flex flex-col w-full max-w-[320px] bg-gray-100 rounded-s-xl rounded-br-xl mb-4">
            <p className="text-md font-normal text-gray-900 p-[0.9rem] emisor">{receptor?.message}</p>
            <span className="text-sm font-normal text-gray-500 p-[0.3rem] text-end">{dateFormat(receptor?.date, "dd-mm-yyyy HH:MM TT")}</span>
          </div>
          <div className="flex gap-2 items-center mb-4 relative md:top-[-1rem] md:left-[1rem] left-[0rem]">
            <img alt="User Icon" className="w-[1.6rem]" src={'data:image/jpeg;base64,'+remitente.avatar} />
            <h1 className="text-white !bg-transparent font-bold !text-[1rem]">{remitente?.nombre}</h1>
          </div>
        </div>

        <div className="px-4 py-4">
          <span className="font-bold text-base underline text-black">Responder:</span>
          <form className="block mt-2" onSubmit={setMessage}>
            <input
              type="text"
              name="message"
              placeholder="Escribe tu mensaje..."
              className="w-full md:w-1/2 bg-white text-black h-[6rem] rounded-md px-4"
            />
            <div className="w-full py-4">
              <button className="w-max bg-blue-600 text-white px-4 py-2 rounded-md" type='submit' >
                Enviar mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </dl>
  );
}
