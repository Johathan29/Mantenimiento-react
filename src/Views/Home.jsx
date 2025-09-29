import Child from '../Views/Child.jsx';

import ControllerChild from '../Controllers/ControllerChild.jsx';
import { useEffect } from 'react';
export default function HomePage(){
    
    const data = ControllerChild();
    return(
        <>
      
        <Child array={data} />
        </>
    )
}