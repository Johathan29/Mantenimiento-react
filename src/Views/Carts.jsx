import { useEffect, useState } from "react";
import Cart from "../Components/carts";
//import { addToCart, getCartItems, removeFromCart } from "../Services/cartService";
import axios from "axios";
export default function Carts({ currentUser, product }) {
  const [cart, setCart] = useState([]);
useEffect(()=>{
const fetchCart = async () => {
    
    const api = import.meta.env.VITE_API_BASE_URL;
const res=await axios.get(`${api}/api/cart`);
console.log(res)
    setCart(res.data);
  };
 
  fetchCart()
},[])
  

  /*const handleAdd = async () => {
    await addToCart(currentUser.uid, product, 1);
    fetchCart();
  };
*/
  
  return (
    <>
    <Cart/>
            
    </>
  );
}
