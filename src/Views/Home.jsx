import Child from '../Views/Child.jsx';

import ControllerChild from '../Controllers/ControllerChild.jsx';
import { useEffect } from 'react';
import BirthDay from '../Components/BirthDayComponent.jsx';
import App from '../App.jsx';
import ProductComponent from './Product.jsx';
import AllProducts from './AllProducts.jsx';
export default function HomePage(){
     useEffect(() => {
    document.title = 'Home - Solution Supports';
  }, []);
    const data = ControllerChild();
    return(
        <>
        <App></App>
        <Child />
       <ProductComponent></ProductComponent>
      {/* <AllProducts></AllProducts>*/}
        <BirthDay></BirthDay>
        </>
    )
}