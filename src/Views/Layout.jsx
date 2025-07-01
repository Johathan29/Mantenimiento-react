import { Outlet, Link } from "react-router-dom";
import HeaderComponent from "../Components/HeaderComponent";
import FooterComponent from "../Components/FooterComponent";
export default function Layout(){
    return(
        <>
         <HeaderComponent></HeaderComponent>
         <div className="max-w-screen-xl mx-auto py-[2rem]">
            <div className="h-[40rem] ">
            <Outlet />
            </div>
        </div>
        <FooterComponent></FooterComponent>
        </>
    )}