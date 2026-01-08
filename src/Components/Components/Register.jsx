// components/Register.jsx
import { useState } from 'react';
import { registerUser } from '../Services/authService';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser(email, password);
      setMsg('Registro ok. Ya puedes iniciar sesión.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setMsg(err.message || 'Error en registro');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Registro</h2>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="mb-2 w-full p-2 border" />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required className="mb-2 w-full p-2 border" />
      <button type="submit" className="px-4 py-2 bg-green-600 text-white">Registrarme</button>
      {msg && <p className="mt-2">{msg}</p>}
    </form>
  );
}
