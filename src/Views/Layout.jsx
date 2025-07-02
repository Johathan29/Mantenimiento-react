import { Outlet, Link } from "react-router-dom";
import HeaderComponent from "../Components/HeaderComponent";
import FooterComponent from "../Components/FooterComponent";
export default function Layout(){
    return(
        <>
         <HeaderComponent></HeaderComponent>
         <div className="max-w-screen-xl md:mx-auto py-[2rem]">
            <div className="h-full min-h-[28rem] ">
            <Outlet />
            </div>
        </div>
        <FooterComponent></FooterComponent>
        </>
    )}