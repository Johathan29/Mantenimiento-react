import { useLocation } from "react-router-dom"


export default function PathLocation(){
   const path=useLocation()
   return path.pathname;
}