import { useEffect, useState } from "react";

export default function Endpoint(){
 const API = "http://localhost/api/"; 
 const [users , setUsers]=useState()
  const getUsers = () => {
    fetch(API + "users.php")
      .then((res) => setUsers(res.json()))
    
  };
  useEffect(getUsers, []);
}

