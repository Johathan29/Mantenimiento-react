// context/MyEstadoGlobalContext.jsx
import React, { createContext, useState, useContext } from 'react';

const MyEstadoGlobalContext = createContext();

export default function MyEstadoGlobalProvider() {
  const [mostrar, setMostrar] = useState([]);

  return (
    <MyEstadoGlobalContext.Provider value={{ mostrar, setMostrar }}>
    {mostrar}
    </MyEstadoGlobalContext.Provider>
  );
}

// Hook personalizado para usar fácilmente el contexto
export function useMyEstadoGlobal() {
  return useContext(MyEstadoGlobalContext);
}
