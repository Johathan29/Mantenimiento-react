import PropTypes from 'prop-types';
import { Link,useParams } from 'react-router-dom';
import ControllerChild from '../Controllers/ControllerChild';
import { useEffect,useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore/lite';
function DetailChild() {
  useEffect(() => {
    document.title = 'Users Page';
  }, []);
  let id = useParams();
  let userid=id
  const data = ControllerChild();
  let user=data.users.filter((item)=>  item.id ==userid.id)
    const [datacollection, setCollection] = useState([]);
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

console.log(firebaseConfig)
  // Agrupar por rol
  function groupByRol(data) {
    const grouped = {};
    for (const item of data) {
      if (!grouped[item.rol]) grouped[item.rol] = [];
      grouped[item.rol].push(item);
    }
    return Object.entries(grouped); // [[rol, items], ...]
  }

  // 🧪 Traer datos de Firestore
  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const docs = querySnapshot.docs.map(doc => doc.data());
      setCollection(docs);

     
    }

    fetchData();

    // Crear un usuario de prueba SOLO UNA VEZ
    /*async function createUserOnce() {
      await setDoc(doc(db, "users", "LA"), {
        email: 'rosariojohathan@gmail.com',
        iduser: 2,
        rol: 'admin',
        password:'Michael1234$',
        keyToken:'U2FsdGVkX19TWOw5MBWLsDUeHS9bs2I2BeEYj1SfOAQ=',
        imagen: "https://dummyjson.com/icon/michaelw/128",
        nombre: "michael",
        profesión: "Developer"
      });
    }
    createUserOnce();*/
  }, []);
  let colletionUser=datacollection.filter(item=> item.iduser==userid.id)
  console.log(colletionUser)
  return (
    <>
  
{
  colletionUser.map(item=>(
    <div key={item.iduser} className='bg-transparent'>
      <h1 className='text-white !bg-transparent border-b-[1px] border-white w-full capitalize'> {item.nombre} {item.profesión}</h1>
    </div>
  ))

}

      

      
    
    
    </>
  );

}


export default DetailChild;
