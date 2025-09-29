import { useEffect } from "react"
import PathLocation from "../Hooks/Location";

export default function TitlePage(props){
    const path = PathLocation();
    const value=path.replace("/" ,"").replace("_"," ")
    useEffect(()=>{
        document.title=value.toUpperCase()
      })
    
}