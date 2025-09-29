import { useEffect, useState } from "react";
//import Endpoint from "./server/db.js";

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ nombre: "", email: "" });
  const [editId, setEditId] = useState(null);
  const API = "http://localhost/api/"; 
  const getUsers = () => {
    fetch(API + "users/users.php")
      .then((res) => res.json()).then(setUsers)
    
  };
  
  useEffect(()=>
 getUsers
   , []);
  //useEffect(getUsers, []);
const handleEdit = (user) => {
    setForm({iduser:user.id, nombre: user.nombre, email: user.email });
    setEditId(user.id);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const endpoint = editId ? "users/updateusers.php" : "users/addusers.php";
    const data = editId ? { ...form, id: editId } : form;
  const dataForm = new FormData(e.target);
  const dataPost = {
      email: dataForm.get('email'),
      firstname: dataForm.get('first_last_name'),
      message: dataForm.get('message'),
    };
    
 await fetch("http://localhost/api/"+endpoint, {
  method: editId ? "PUT":"POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form)
})
  .then(res => res.json())
  .then(data => {
    console.log("Respuesta del servidor:", data);
    // Opcional: recargar lista de usuarios
  }).then(getUsers)
  .catch(err => console.error("Error al enviar:", err));
  
  };

  const handleDelete =  (id) => {
    fetch(API + "users/deleteusers.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({iduser:id}),
    })
      .then((res) => res.json())
      .then(getUsers);
  };

  

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Gestión de Usuarios</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
        value={form.nombre}
           onChange={(e) => setForm({ ...form, nombre: e.target.value })}
         name="nombre"
        />
        <input
          placeholder="Email"
          value={form.email}
           onChange={(e) => setForm({ ...form, email: e.target.value })}
         name="email"
        />
        <button type="submit">{editId ? "Actualizar" : "Agregar"}</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.iduser}>
            {u.nombre} - {u.email}{" "}
            <button onClick={() => handleEdit(u)}>Editar</button>{" "}
            <button onClick={() => handleDelete(u.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
