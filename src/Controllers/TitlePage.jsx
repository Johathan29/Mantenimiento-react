import { useEffect } from "react"
import PathLocation from "../hooks/Location";

export default function TitlePage(props){
    const path = PathLocation();
    console.log(path)
    const value=path.replace("/" ,"").replace("_"," ")
   
    useEffect(()=>{
        document.title= path==='/'? 'Home - Solution Supports':value.slice(0,1).toUpperCase()+value.slice(1)+ ' - Solution Supports';
      })
    
}