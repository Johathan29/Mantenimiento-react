import Child from '../Views/Child.jsx';

import ControllerChild from '../Controllers/ControllerChild.jsx';
import { useEffect } from 'react';
export default function HomePage(){
    useEffect(() => {
        document.title = 'Home Page';
      }, []);
    const data = ControllerChild();
    return(
        <>
      
        <Child array={data} />
        </>
    )
}