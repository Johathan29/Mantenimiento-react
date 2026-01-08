import Child from '../Views/Child.jsx';

import ControllerChild from '../Controllers/ControllerChild.jsx';
import { useEffect, useRef } from 'react';
import BirthDay from '../Components/BirthDayComponent.jsx';
import App from '../App.jsx';
import ProductComponent from './Product.jsx';
import BrandSlider from '../Components/brandSlider.jsx';
import Login from '../Components/FormLogin.jsx';
import TitlePage from '../Controllers/TitlePage.jsx';
import WhyChooseUs from '../Components/WhyChooseUs.jsx';
import ScrollButton from '../Components/ScrollButton.jsx';
 

 
export default function HomePage(){
  const sectionRef = useRef("scroll");
   const handleScroll = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
     useEffect(() => {
    document.title = 'Home - Solution Supports';
  }, []);
  console.log(TitlePage())
    const data = ControllerChild();
    return(
        <>
        <App></App>
     <BrandSlider/>
    {/*<ScrollButton onScroll={handleScroll}></ScrollButton>*/}
     <ProductComponent refProp={sectionRef}/>
     <WhyChooseUs/>
        <Child />
       
       
      {/* <AllProducts></AllProducts>*/}
       <Login></Login>
        <BirthDay></BirthDay>
        </>
    )
}