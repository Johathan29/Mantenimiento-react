import { useEffect, useMemo, useState } from 'react';
import CounterNotifique from '../Hooks/counterNotifique';
import dataMensaje from '../Data/dataMensaje.json'
import TitlePage from '../Controllers/TitlePage';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore/lite';
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import { userController } from '../Controllers/controllerUser';
export default function FormRegistered() {
  const [userNew, setNewUser] = useState([]);
  //const { data,counter } = CounterNotifique();
  /*const firebaseConfig = {
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
  */
  const insertnewuser = (event) => {
    event.preventDefault(); // Prevenir recarga
    const data = new FormData(event.target);
    const dataUser = {
      email: data.get('floating_email'),
      profesion: data.get('profesion'),
      date:data.get('birthday'),
      tel:data.get('floating_phone'),
      password:data.get('floating_password'),
      imagen:"https://dummyjson.com/icon/michaelw/128",
      password_confirm:data.get('repeat_password'),
      firstname: data.get('floating_first_name'),
      lastname: data.get('floating_last_name'),
      company: data.get('floating_company'),
      departament: data.get('departament'),
      rol: data.get('role'),
    };
    
    setNewUser((prev) => [...prev, dataUser]);
    //createUserOnce(dataUser);
    userController.addUser(dataUser)
    // Opcional: puedes limpiar el formulario si deseas
    event.target.reset();
  };
  TitlePage()
    // Crear un usuario de prueba SOLO UNA VEZ
   /* async function createUserOnce(item) {
      const hash = AES.encrypt(item.email, 'secret key').toString();
      const hashverify=hash.replace('/','')
        await setDoc(doc(db, "users", hashverify), {
          date:item.date,
          departament:item.departament,
          email: item.email,
          iduser: 2,
          rol: 'admin',
          keyToken:AES.encrypt(item.password_confirm===item.password ? item.password_confirm : '' , 'secret key').toString(),
          password:item.password_confirm===item.password ? item.password_confirm : '',
          imagen: "https://dummyjson.com/icon/michaelw/128",
          nombre: item.firstname + " " + item.lastname,
          profesión: item.profesion,
          state:false,
        });
      
      
    }*/
  return (
    <>
       

      <h1 className="text-white !bg-transparent  w-full">Form Registered</h1>
      <hr className='border-t-[6px] rounded-[15px] text-[#ffffff66]'/>
      <div className="block w-full py-[2rem]">
        <div className='rounded md:rounded-xl   border-1 px-[2rem] py-[2rem] md:w-1/2 '>
          <form class="max-w-md mx-auto" onSubmit={insertnewuser}>
            <div class="relative z-0 w-full mb-5 group">
                <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-500 font-bold dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                <label for="floating_email" class="peer-focus:font-medium absolute text-sm  text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:font-bold peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-focus:dark:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="password" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-5 group">
                  <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                  <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
              </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-5 group">
                  <input type="date" name="birthday" id="birthday" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="birthday" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Date of both</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                  <select type="date" name="departament" id="departament" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required >
                  <option selected>Select one option</option>
                    <option value="TI">TI</option>
                    <option value="Business">Business</option>
                    </select>
                  <label for="departament" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Departament</label>
              </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-5 group">
                  <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                  <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
              </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                  <select name="role" id="role" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required >
                  <option selected>Select one option</option>
                    <option value="admin">Administrator</option>
                    <option value="moderation">moderation</option>
                    <option value="visit">Visit</option>
                    </select>
                  <label for="role" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Types users</label>
              </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
