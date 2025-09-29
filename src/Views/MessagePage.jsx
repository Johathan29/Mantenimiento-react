import { NavLink } from 'react-router-dom'
//import data from '../Data/dataMensaje.json'
import { useEffect, useState } from 'react'
import avatar from '../assets/users.png'
import TitlePage from '../Controllers/TitlePage'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore/lite';
export default function MessagePage(){
    TitlePage()
    const [readed,setRead]=useState(false)
  const [message, setMessages] = useState([]);
    const [Setmessage, setMessage] = useState({ id:'',state: false });
  const API = "http://localhost/api/"; 
  localStorage.setItem("iduser",2)
  let id=parseInt(localStorage.getItem("iduser"));
  const getUsers = () => {
    fetch(API + "message/message.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id:id}),
  })
    .then((res) => res.json())
    
    .then(setMessages)
    .catch((err) => console.error("Error al obtener usuarios:", err))
    
  };
  const changeState=(item)=>{
    setMessage({id:item.id, state: true})
    console.log(Setmessage)
    fetch(API + "message/updatemessage.php", {
      method: "PUT",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({id:item.id, state: true}),
    }).then(res => res.json())
  .then(data => {
    console.log("Respuesta del servidor:", data);
    // Opcional: recargar lista de usuarios
  }).then(getUsers)
  .catch(err => console.error("Error al enviar:", err));
  }
  useEffect(()=>
 getUsers
   , []);
   console.log(message.map(item=> item.avatar))
/*const read=(item)=>{
   
document.getElementById('msgId-1').classList.add('read');

}*/
 const [datacollection, setCollection] = useState([]);
  const [groupedByRol, setGroupedByRol] = useState([]);
const key="AIzaSyAZ7UImhQ-sSuc8aUB0u6WuHwX8dTDe6m8"
  const firebaseConfig = {
    apiKey:import.meta.env.VITE_apiKey,
    authDomain:import.meta.env.VITE_authDomain,
    databaseURL:import.meta.env.VITE_databaseURL,
    projectId:import.meta.env.VITE_projectId,
    storageBucket:import.meta.env.VITE_storageBucket,
    messagingSenderId:import.meta.env.VITE_messagingSenderId,
    appId:import.meta.env.VITE_appId,
    measurementId:import.meta.env.VITE_measurementId
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Agrupar por rol
  function groupByRol(data) {
    const grouped = {};
    for (const item of data) {
      if (!grouped[item.iduser]) grouped[item.iduser] = [];
      grouped[item.iduser].push(item);
    }
    return Object.entries(grouped); // [[rol, items], ...]
  }

  // 🧪 Traer datos de Firestore
  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, 'crud'));
      const docs = querySnapshot.docs.map(doc => doc.data());
      setCollection(docs);

      const grouped = groupByRol(docs);
      setGroupedByRol(grouped);
    }

    fetchData();

  },[] );
  console.log(datacollection.find(item=> item.iduser===1))
return(
    <>
     <h1 className="text-white !bg-transparent  w-full">Inbox</h1>
<hr className='border-t-[6px] rounded-[15px] text-[#ffffff66]'/>
<dl class="text-gray-900  !text-white dark:divide-gray-700 py-8">


<ul role="list" className='px-[3rem] py-[2rem] rounded-[15px] bg-[#f0f8ff5e] border-[1rem] border-[#bfeaf438] w-full h-min-[17rem]'>
    {message.map((item,index)=>
   //imgSrc = "data:image/jpeg;base64,${item.avatar}")
    //-- Remove top/bottom padding when first/last child 
    message.length!==0 ?
    <li className={item.state==false? ' py-4 px-[1rem]  last:border-b-0 border-b-4 border-[#f9f9f97d] hover:bg-[#cce3eb] bg-[#cce3eb] ': ' py-4 px-[1rem]  last:border-b-0 border-b-4 border-[#f9f9f97d] hover:bg-[#cce3eb] bg-transparent'}  key={item.id}>
        <NavLink onClick={()=>changeState(item)} to={'./messageID:'+item.id+'&&userID:'+item.iduser} className="flex" id={'msgId-'+item.id}>
            <img class="h-10 w-10 rounded-full" src={'data:image/jpeg;base64,'+item.avatar} alt={"user avatar "+item.nombre} />
            <div class="ml-3 overflow-hidden">
                <p class="text-[1.5rem] font-medium text-[#023866] ">{item.nombre} {item.posicion} {item.iduser} {item.iduserreceptor} {item.id}</p>
                <p class="truncate text-sm text-gray-500 font-bold">{item.email}</p>
                <span className='truncate block w-[10rem] text-[13px] text-white'>{item.message}</span> 
               
            </div>
           
        </NavLink>
         <div className='flex gap-[1px] !items-center justify-center !w-[45%] '>
                  <button className='!bg-transparent hover:!border-[0px] !border-[0px] z-50' onClick={()=>changeState(item)}> 
                   <i className="fa-solid fa-eye text-gray-500 hover:text-gray-700"></i>
                  </button>
                  <button className='!bg-transparent hover:!border-[0px] !border-[0px] z-50'> 
                    <i class="fa-solid fa-trash hover:text-red-800 text-red-700"></i>
                  </button>
            </div>
    </li>
     : <li> <h1> No tiene mensaje </h1></li>
  )}
</ul>
  
   
  
</dl>

    </>
)
}