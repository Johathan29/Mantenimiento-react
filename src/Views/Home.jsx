import Child from '../Views/Child.jsx';

import ControllerChild from '../Controllers/ControllerChild.jsx';
import { useEffect } from 'react';
import BirthDay from '../Components/BirthDayComponent.jsx';
import App from '../App.jsx';
import ProductComponent from './Product.jsx';
import BrandSlider from '../Components/brandSlider.jsx';
import Login from '../Components/FormLogin.jsx';
import TitlePage from '../Controllers/TitlePage.jsx';
import WhyChooseUs from '../Components/WhyChooseUs.jsx';

export default function HomePage(){
     useEffect(() => {
    document.title = 'Home - Solution Supports';
  }, []);
  console.log(TitlePage())
    const data = ControllerChild();
    return(
        <>
        <App></App>
     <BrandSlider/>
     <ProductComponent/>
     <WhyChooseUs/>
        <Child />
       
       
      {/* <AllProducts></AllProducts>*/}
       <Login></Login>
        <BirthDay></BirthDay>
        </>
    )
}