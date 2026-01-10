import { useState, useEffect, useMemo, createElement } from 'react';


export default function CounterNotifique() {
  const [data, getForm] = useState([]);
  let [counter, getCounter] = useState([]);
  const [error, setError] = useState(null);
  const  contador= data.data;
  if(contador=== undefined){
    console.log('No tiene notificaciones')
  }else{
    counter=contador.length
    console.log(counter);
    
  }
  console.log(data.data)
  useEffect(()=>{
    
    document.getElementById('notifiqueNumber').innerHTML=counter;
    const ul=document.getElementById('nav-Notificaciones');
    if(contador!== undefined){
    contador.map((item,index)=> {
    const li = document.createElement("li");
    const a = document.createElement("a");
        a.classList.add('py-2')  
        a.classList.add('px-4')  
        a.classList.add('block')        
        a.setAttribute("href",'/'+index)// and give it some content
        const newContent = document.createTextNode(item.firstname);
      
        // add the text node to the newly created div
        a.appendChild(newContent);
        li.appendChild(a);
        ul.appendChild(li)
    })}
    data.map(item=> { 
        
       console.log(item.data.message)})
    
   
  },[counter,data]
  
  )
  

  return { data, counter, error };
}
