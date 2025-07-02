import { Outlet, Link } from "react-router-dom";
import HeaderComponent from "../Components/HeaderComponent";
import FooterComponent from "../Components/FooterComponent";
export default function Layout(){
    return(
        <>
         <HeaderComponent></HeaderComponent>
<<<<<<< HEAD
         <div className="max-w-screen-xl md:mx-auto py-[2rem]">
            <div className="h-full min-h-[28rem] ">
=======
         <div className="max-w-screen-xl mx-auto py-[2rem]">
            <div className="h-[40rem] ">
>>>>>>> 16d950ea618718884b2a6b9924ee3c6247e51ad6
            <Outlet />
            </div>
        </div>
        <FooterComponent></FooterComponent>
        </>
    )}