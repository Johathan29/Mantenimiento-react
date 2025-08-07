import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import useControllerChild from '../Controllers/ControllerChild';
import PathLocation from '../Hooks/Location';
import TitlePage from '../Controllers/TitlePage';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore/lite';
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';

function Child() {
  const [datacollection, setCollection] = useState([]);
  const [groupedByRol, setGroupedByRol] = useState([]);

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

  // Encriptar y desencriptar mensaje
  const hash = AES.encrypt('message', 'secret key').toString();
  const bytes = AES.decrypt(hash, 'secret key');
  const decryptedMessage = bytes.toString(encUtf8);

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

      const grouped = groupByRol(docs);
      setGroupedByRol(grouped);
    }

    fetchData();

    // Crear un usuario de prueba SOLO UNA VEZ
    async function createUserOnce() {
      await setDoc(doc(db, "users", "LA"), {
        email: 'rosariojohathan@gmail.com',
        iduser: 2,
        rol: 'admin',
        imagen: "https://dummyjson.com/icon/michaelw/128",
        nombre: "michael",
        profesión: "Developer"
      });
    }

    createUserOnce();
  }, []);

  const path = PathLocation();
  TitlePage();

  const { users, loading } = useControllerChild();

  const visibleUsers = useMemo(() => {
    return path === '/users' ? users : users.slice(0, 5);
  }, [path, users]);

  if (loading) {
    return <h1 className="uppercase bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Loading<span className='text-red-500'>...</span></h1>;
  }

  return (
    <>
      {groupedByRol.map(([rol, items]) => (
        <div key={rol} className='divide-y-[4px] divide-[#ffffffa1]'>
          <h2 className="text-2xl font-bold mb-4 text-[#00718d] uppercase">{rol}</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mb-6">
            {items.map(item => (
              <Link
                to={`/users/${item.iduser}`}
                key={item.iduser}
                className="group hover:shadow-xl p-[1rem] border-[4px] rounded-xl border-[#fff] w-[15rem] bg-white text-[#01718d] hover:bg-[#01718d] hover:!text-white"
              >
                <p className="text-md font-bold truncate">{item.email}</p>
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="aspect-square w-[6rem] h-[6rem] rounded-full bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8 hover:border-2 hover:rounded-full hover:border-white"
                />
                <h3 className="mt-4 text-[1.5rem]">{item.nombre}</h3>
                <div className='flex gap-1 items-center leading-2'>
                  <p className="text-sm font-bold">profesión:</p>
                  <span className='text-[12px] font-medium mr-2 truncate'>{item.profesión}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {path !== '/users' && (
        <Link
          to="/users"
          className="text-white hover:bg-white hover:text-[#00718d] hover:border-[#00718d] border border-white flex items-center w-max gap-2 uppercase text-sm px-4 py-2 bg-[#00718d] rounded"
        >
          All views <i className="fa-solid fa-arrow-right"></i>
        </Link>
      )}

      <div id="data-container"></div>
      <div id="pagination-container"></div>
    </>
  );
}

export default Child;
