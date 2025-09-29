import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState,useRef } from 'react';
import useControllerChild from '../Controllers/ControllerChild';
import PathLocation from '../Hooks/Location';
import Hero from '../assets/hero.jpeg'
import TitlePage from '../Controllers/TitlePage';
import process from 'process'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore/lite';
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import { userController } from '../Controllers/controllerUser';
function CounterCard({ role, icon, count, color }) {
  const [start, setStart] = useState(false);
  const [current, setCurrent] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setStart(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
  }, []);

  useEffect(() => {
    if (start) {
      let i = 0;
      const step = count / 100;
      const interval = setInterval(() => {
        i += step;
        if (i >= count) {
          setCurrent(count);
          clearInterval(interval);
        } else {
          setCurrent(Math.ceil(i));
        }
      }, 0.3);
    }
  }, [start, count]);

  return (
    <div ref={ref} data-slot="card" className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border-[#d5d9d8] border-[1px] h-full hover:shadow-lg hover:shadow-[#1a596f85] transition-shadow duration-300 cursor-pointer">
              <div data-slot="card-content" className="[&:last-child]:pb-6 p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#f0f8ff]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-user w-6 h-6 text-[#00718d]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-[#21242c]">Gestión de Usuarios</h3>
                       <div className="text-sm text-[#73888c]">Total de usuarios</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                        {/* 👇 Aquí el contador animado */}
                        <div className="text-[2rem] font-bold text-[#00728f] text-left">{current>=100 ? current+'+':current}</div>
                      </div>
              </div>
            </div>
    // <div
    //   ref={ref}
    //   className="bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl p-6 flex items-center gap-4"
    // >
    //   <div className={`p-4 rounded-full ${color}`}>
    //     <i className={`fas ${icon} text-2xl`}></i>
    //   </div>
    //   <div>
    //     <h3 className="text-gray-500 text-sm font-medium">{role}</h3>
    //     <p className="text-3xl font-bold text-gray-900">{current}</p>
    //   </div>
    // </div>
  );
}
function Child() {
  const { fetchUsers, deleteUser } = userController;
  const [userLogin, setUserLogin] = useState([]);
  const [datacollection, setCollection] = useState([]);
  const [groupedByRol, setGroupedByRol] = useState([]);
  const [userCount, setUserCount] = useState(0); // 👈 contador animado

  // Agrupar por rol
  function groupByRol(data) {
    const grouped = {};
    for (const item of data) {
      if (!grouped[item.rol]) grouped[item.rol] = [];
      grouped[item.rol].push(item);
    }
    return Object.entries(grouped); // [[rol, items], ...]
  }

  function deleteListUser(iduser) {
    const userToDelete = datacollection.find(item => item.iduser === iduser);
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setCollection(prev => prev.filter(u => u.iduser !== iduser));
      setGroupedByRol(groupByRol(datacollection.filter(u => u.iduser !== iduser)));
    }
  }

  // 🧪 Traer datos de Firestore
  useEffect(() => {
    setUserLogin(JSON.parse(localStorage.getItem("user")));
    async function fetchData() {
      const data = await fetchUsers();
      setCollection(data);
      setGroupedByRol(groupByRol(data));

      // animar el contador cuando llegan los datos
      let start = 0;
      setUserCount(data.length);
     
    }
    fetchData();
  }, []);

  const path = PathLocation();
  TitlePage();

  const { users, loading } = userController.fetchUsers;

  const visibleUsers = useMemo(() => {
    return path === '/users' ? groupedByRol : groupedByRol.slice(0, 5);
  }, [path, groupedByRol]);

  if (loading) {
    return (
      <h1 className="uppercase bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
        Loading<span className='text-red-500'>...</span>
      </h1>
    );
  }

  return (
    <>
      <section className="bg-white text-gray-400 p-[4rem] mt-[34%]" style={{
    backgroundImage: "url('/src/assets/BackgroundCard.png')",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    width: "100%",
    minHeight: "400px",
  }}>
        <div className="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-[#0f5167] mb-2">Visualiza el Rendimiento</h2>
            <p class="text-md text-[#414652] max-w-xl mx-auto">Visualiza de un vistazo el rendimiento de tu negocio con métricas en tiempo real, gráficos dinámicos y fáciles de interpretar, e información centralizada para una mejor toma de decisiones.</p>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" >
             <CounterCard role="Administradores" icon="fa-user-shield" count={userCount} color="bg-red-100 text-red-600" />
             <CounterCard role="Administradores" icon="fa-user-shield" count={userCount} color="bg-red-100 text-red-600" />
             <CounterCard role="Administradores" icon="fa-user-shield" count={userCount} color="bg-red-100 text-red-600" />
             <CounterCard role="Administradores" icon="fa-user-shield" count={userCount} color="bg-red-100 text-red-600" />

          </div>
        </div>
      </section>
     {/* <h1 className="text-white !bg-transparent  w-full">Collaborators</h1>
       <hr className="border-t-[6px] rounded-[15px] text-[#ffffff66] mb-[2rem]"></hr>
      {groupedByRol.map(([rol, items]) => (
        <div key={rol} className='divide-y-[4px] divide-[#ffffffa1]'>
          <h2 className="text-2xl font-bold mb-4 text-[#00718d] uppercase w-min">{rol}</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mb-6">
            {items.map(item => (
              <div
               
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
                  <button className={userLogin.rol==='admin'?'!bg-transparent !text-red-500 hover:!text-red-700 hover:!border-none !border-none' :"hidden"} onClick={()=>deleteListUser(item.iduser)}> <i class="fa-solid fa-trash"></i></button>
                  <Link  to={`/our_collaborators/${item.iduser}`} className='!bg-transparent !text-gray-500 hover:!border-none hover:!text-gray-700 !border-none' > <i class="fa-solid fa-eye"></i></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {path !== '/our_collaborators' && (
        <Link
          to="/our_collaborators"
          className="!text-white hover:bg-white hover:!text-[#00718d] hover:!border-[#00718d] border border-white flex items-center w-max gap-2 uppercase text-sm px-4 py-2 bg-[#00718d] rounded"
        >
          All views <i className="fa-solid fa-arrow-right"></i>
        </Link>
      )}

      <div id="data-container"></div>
      <div id="pagination-container"></div>*/}
    </>
  );
}

export default Child;
