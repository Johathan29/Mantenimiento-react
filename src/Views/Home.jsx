import Child from '../Views/Child.jsx';

import ControllerChild from '../Controllers/ControllerChild.jsx';
import { useEffect } from 'react';
import BirthDay from '../Components/BirthDayComponent.jsx';
export default function HomePage(){
    
    const data = ControllerChild();
    return(
        <>
     
        <Child />
        <BirthDay></BirthDay>
        </>
    )
}