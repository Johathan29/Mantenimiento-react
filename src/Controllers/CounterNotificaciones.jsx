import { useState, useEffect } from 'react';

export default function CounterNotificaciones() {
  const [message, setMessage] = useState([]);
 
const [valueCount, setValueCount] = useState([]);
const contador=message.message

console.log(contador)
  useEffect(() => {
   
  }, [valueCount]);

  return { valueCount,message };
}
