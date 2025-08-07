import PropTypes, { number, string } from 'prop-types';
import { Link,useParams } from 'react-router-dom';
import ControllerChild from '../Controllers/ControllerChild';
import { useEffect,useState } from 'react';
import { initializeApp } from 'firebase/app';
import { format } from 'date-fns';
import { getFirestore, collection, getDocs,setDoc,doc } from 'firebase/firestore/lite';
import { year } from 'drizzle-orm/mysql-core';
function DetailChild() {
  const firebaseConfig={
    apiKey: "AIzaSyAZ7UImhQ-sSuc8aUB0u6WuHwX8dTDe6m8",
    authDomain: "crudfirebaseangular-f567e.firebaseapp.com",
    databaseURL: "https://crudfirebaseangular-f567e-default-rtdb.firebaseio.com",
    projectId: "crudfirebaseangular-f567e",
    storageBucket: "crudfirebaseangular-f567e.firebasestorage.app",
    messagingSenderId: "139213728766",
    appId: "1:139213728766:web:f8fa5f5c8a4271e78eeeaf",
    measurementId: "G-9RVHN12TR1"
  }
  const app = initializeApp(firebaseConfig);
  
const db = getFirestore(app);
const [datacollection, setCollection]=useState([]);
    async function getUsers(db) {
      const citiesCol = collection(db, 'users');
      const citySnapshot = await getDocs(citiesCol);
      const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
    }
    
    useEffect(() => {
      async function fetchData() {
        const result = await getUsers(db);
        setCollection(result);
      }
      fetchData();
    }, []); 
  useEffect(() => {
    document.title = 'Users Page';
  }, []);
  let id = useParams();
  let userid=id
  const data = ControllerChild();
  let user=datacollection.filter((item)=>  item.iduser ==userid.id)
  let date=user.map(item=> new Date(item.date.seconds*1000)).toString().slice(0,15);

  return (
    <>
  
{
  user.map(item=>(
  
    <section className='bg-transparent' key={item.id}>
      <div className='flex gap-2 items-center'>
       <img src={item.imagen}/><h1 className='text-white !bg-transparent border-b-[1px] border-white w-full'> {item.nombre} </h1>
      </div>
      <ul className='px-[9rem] divide-y divide-gray-400'>
        <li className='flex gap-4 items-center p-4'>
         <p className='font-bold text-md w-[4rem]'>Email:</p>
         <span>{item.email}</span> 
        </li>
        <li className='flex gap-4 items-center p-4'>
         <p className='font-bold text-md '>Fecha de Nacimiento:</p>
         <span>{format(date, 'dd-MM-yyy')}</span> 
        </li>
        <li className='flex gap-4 items-center p-4'>
         <p className='font-bold text-md '>Profesión:</p>
         <span>{item.profesión}</span> 
        </li>
      </ul>
         </section>
    ))
  }

      

      
    
    
    </>
  );

}


export default DetailChild;
