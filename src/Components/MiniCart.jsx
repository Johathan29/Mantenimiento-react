import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { ShoppingBag, X, Trash2, Plus, Minus } from "lucide-react";
import PathLocation from "../hooks/Location";
import { Link } from "react-router-dom";

export default function MiniCart() {
  const [open, setOpen] = useState(false);
  const {
     user, cart, loading, addToCart, removeFromCart, clearCart
  } = useCart();
  const path = PathLocation();
const subtotal = cart.reduce(
    (acc, item) => acc + item.Price * (item.quantity || 1),
    0
  );
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
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        ></div>
      )}

      {/* Sidebar del carrito */}
      <div
        className={`fixed top-0 right-0 w-80 sm:w-96 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b bg-[#00718d] mb-4">
          <h2 className="text-xl font-semibold"> <i class="fa-solid fa-cart-shopping"></i> Tu carrito</h2>
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
            <ul className="space-y-4 divide-y divide-gray-200/50">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center gap-3 border-b pb-3">
                  <img
                    src={item.Image}
                    alt={item.Name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 truncate">{item.Name}</p>
                    <p className="text-sm text-gray-500">$ {`${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(item.Price)} USD`}</p>

                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="!p-[3px] !rounded-full hover:bg-gray-200 !bg-[#d0cece] hover:!bg-[#a9a9a9] hover:!text-white !text-black"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="!p-[3px] !rounded-full hover:bg-gray-200 !bg-[#d0cece] hover:!bg-[#a9a9a9] hover:!text-white !text-black"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeProduct(item.id)}
                    className="!text-red-400 !border-0 !text-md !outline-none !bg-transparent hover:!text-red-500 hover:!border-0 !p-1"
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer del carrito */}
        {cart.length > 0 && (
          <div>  
            <Link to="/carts" className="bg-black !text-white">Ver carrito completo</Link>
            <div className="absolute bottom-0 left-0 w-full border-t  p-4 bg-[#00718d]">
             <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">$ {`${new Intl.NumberFormat("en-US", {
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
          </div>
        )}
      </div>
    </>
  );
}
