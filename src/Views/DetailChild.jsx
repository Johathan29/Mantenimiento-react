import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { format } from 'date-fns';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

function DetailChild() {
  const firebaseConfig = {
    apiKey: "AIzaSyAZ7UImhQ-sSuc8aUB0u6WuHwX8dTDe6m8",
    authDomain: "crudfirebaseangular-f567e.firebaseapp.com",
    databaseURL: "https://crudfirebaseangular-f567e-default-rtdb.firebaseio.com",
    projectId: "crudfirebaseangular-f567e",
    storageBucket: "crudfirebaseangular-f567e.appspot.com",
    messagingSenderId: "139213728766",
    appId: "1:139213728766:web:f8fa5f5c8a4271e78eeeaf",
    measurementId: "G-9RVHN12TR1"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [datacollection, setCollection] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    document.title = 'Users Page';

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = querySnapshot.docs.map(doc => doc.data());
      setCollection(users);
    }

    fetchData();
  }, []);

  const user = datacollection.find(item => String(item.iduser) === id);

  if (!user) {
    return <p className="uppercase bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Cargando usuario...</p>;
  }

  // Convertir timestamp a fecha
  const birthDate = user.date?.seconds
    ? new Date(user.date.seconds * 1000)
    : null;

  return (
    <section className='bg-transparent'>
      <div className='flex gap-2 items-center'>
        <img src={user.imagen} alt={user.nombre} className="w-20 h-20 rounded-full" />
        <h1 className='text-white !bg-transparent border-b border-white w-full text-2xl font-bold'>
          {user.nombre}
        </h1>
      </div>

      <ul className='px-[9rem] divide-y divide-gray-400 text-gray-700'>
        <li className='flex gap-4 items-center p-4'>
          <p className='font-bold text-md w-[10rem]'>Email:</p>
          <span className='text-gray-700'>{user.email}</span>
        </li>
        <li className='flex gap-4 items-center p-4'>
          <p className='font-bold text-md w-[10rem]'>Fecha de nacimiento:</p>
          <span className='text-gray-700'>{birthDate ? format(birthDate, 'dd-MM-yyyy') : 'No disponible'}</span>
        </li>
        <li className='flex gap-4 items-center p-4'>
          <p className='font-bold text-md w-[10rem]'>Profesión:</p>
          <span className='text-gray-700'>{user.profesión}</span>
        </li>
      </ul>
    </section>
  );
}

export default DetailChild;
