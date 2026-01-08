import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { ShoppingBag, X, Trash2, Plus, Minus } from "lucide-react";
import PathLocation from "../hooks/Location";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import notImg from '../assets/not-img.png'
export default function MiniCart() {
  const [open, setOpen] = useState(false);
  const [cartitem,setCartItem]=useState([])
  const {
     user, cart, loading,loadCart, addToCart, removeFromCart, clearCart,reducirToCart
  } = useCart();
  const path = PathLocation();
const subtotal = cart.reduce(
    (acc, item) => acc + item.Price * (item.quantity || 1),
    0
  );
  useEffect(()=>{
  const getCarts=async()=>{
    setCartItem(await loadCart('YWnW9Js4i5aajQCvEK6D1fT0BCk2'))
    
  }
   getCarts() 
  },[])
  console.log(cartitem)
  return (
    
    <>
  
      {/* Botón del carrito en el navbar */}
      <button
        onClick={() => setOpen(true)}
        className={"relative flex items-center gap-1 p-2 group rounded-full hover:bg-gray-100 !bg-transparent transition !border-0 !p-0 !outline-none"}
      >
        <ShoppingBag size={22} className=" !group-hover:stroke-sky-500 " />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 rounded-full">
            {cart.length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && (
         path!=="/carts" ?
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        ></div>
        :""
      )}
      
      {/* Sidebar del carrito */}
      { path!=="/carts" ?
      <div
        className={`fixed top-0 right-0 w-80 sm:w-96 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b bg-hero-gradient mb-4">
          <h2 className="text-xl font-semibold !text-white"> <i class="fa-solid fa-cart-shopping"></i> Tu carrito</h2>
          <button onClick={() => setOpen(false)} className="!p-[3px]  !rounded-full !bg-red-500 hover:!bg-white hover:!text-red-500 hover:!border-red-500">
            <X size={20} />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4 overflow-y-auto max-h-[calc(100%-150px)]">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Tu <i class="fa-solid fa-cart-shopping"></i>  está vacío 🛍️
            </p>
          ) : (
            <ul className="space-y-4 divide-y divide-purple-400/50">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center gap-3 border-b pb-3">
                  <img
                    src={item.imagen || notImg}
                    alt={item.Name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 truncate">{item.Name}</p>
                    <p className="text-sm text-gray-500"> {`${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(item.Price)} USD`}</p>

                    <div className="flex items-center gap-2 mt-1">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => {
                          if (item.quantity <= 1) {
                            const confirmDelete = window.confirm("¿Deseas eliminar este producto del carrito?");
                            if (confirmDelete) reducirToCart(item);
                          } else {
                            reducirToCart(item);
                          }
                        }}
                        className="!bg-white border-1 !border-purple-500 hover:!bg-purple-200 hover:!border-[#00718d] h-5 w-5 rounded-full !text-purple-500 !p-0 flex items-center justify-center">
                          <i className="fa-solid fa-minus"></i>
                      </motion.button>
                      <span className="text-gray-400">{item.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => addToCart(item)}
                        className="!bg-white border-1 !border-purple-500 hover:!bg-purple-200 hover:!border-[#00718d] h-5 w-5 rounded-full !text-purple-500 !p-0 flex items-center justify-center"
                      >
                        <i className="fa-solid fa-plus"></i>
                    </motion.button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="!text-red-400 !border-0 !text-md !outline-none !bg-transparent hover:!text-red-500 hover:!border-0 !p-1"
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              )).slice(0,6)}
            </ul>
          )}
        </div>

        {/* Footer del carrito */}
        {cart.length > 0 && (
          <>
          <div className="flex justify-center absolute bottom-[8rem] w-full px-8" >
            <Link to="/carts" onClick={()=> setOpen(false)} className=" inline-flex items-center justify-center gap-2 w-full whitespace-nowrap  !text-white font-bold text-lg px-8 py-6 rounded-full !shadow-lg shadow-sky-900  hover:!bg-white !bg-[#0a83ee] hover:!text-[#0a83ee] !p-[0.6rem]" >
              Ver carrito completo
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 w-full border-t  p-4 bg-hero-gradient ">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">{`${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(subtotal)} USD`}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="flex-1 !bg-gray-200 hover:!bg-gray-300 hover:!border-gray-300 !text-gray-700 !font-bold py-2 rounded-lg"
              >
                Vaciar
              </button>
              <button
                onClick={() => alert("Proceder al pago 💳")}
                className="flex flex-1 items-center !bg-yellow-100 hover:!bg-[#fff92e] !text-[#808080] justify-center gap-4 !font-bold py-2 rounded-lg"
              >
                Comprar <i class="fa-solid fa-credit-card !text-[#daa520]"></i>
              </button>
            </div>
          </div>
          </>
        )}
      </div>
      : "" }
    </>
  );
}
