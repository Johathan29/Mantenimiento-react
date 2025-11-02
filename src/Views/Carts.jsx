import { useEffect, useState } from "react";
import Cart from "../Components/carts";
//import { addToCart, getCartItems, removeFromCart } from "../Services/cartService";
import axios from "axios";
export default function Carts({ currentUser, product }) {
  const [cart, setCart] = useState([]);
  

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
