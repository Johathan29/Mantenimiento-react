import { useCart } from "../contexts/CartContext";

export default function CartView() {
  const { cart, removeFromCart, clearCart, loading, addToCart,removeToCart,decreaseQuantity } = useCart();

  if (loading) return  (<div className="py-24 h-0 md:min-h-[44rem]"> <div className="rounded-xl w-1/2 bg-white flex justify-center shadow-xl container mx-auto ">
 <p className="text-black p-[4rem] text-2xl ">Cargando carrito<span class="dots"></span></p></div></div>);

  // Calcular totales dinámicos
  const subtotal = cart.reduce(
    (acc, item) => acc + item.Price * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-screen-xl  mx-auto py-10 px-4 ">
      {/* Encabezado */}
      <div className="mb-8 md:flex items-center justify-between space-y-4">
        <div>
          <h1 className="text-4xl font-bold !bg-transparent mb-2">
            Carrito de Compras
          </h1>
          <p className="text-muted-foreground">
            {cart.length} producto{cart.length !== 1 && "s"} en tu carrito
          </p>
        </div>
        <a href="/productos">
          <button className="inline-flex items-center justify-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left w-4 h-4"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Seguir Comprando
          </button>
        </a>
      </div>
 
      {cart.length === 0 ? (
         <div className="py-24 h-0 md:min-h-[30rem]"> <div className="rounded-xl w-1/2 bg-white flex justify-center shadow-xl container mx-auto ">
 <p className="text-black p-[4rem] text-2xl ">No hay productos en tu carrito.</p></div></div>)
       : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="rounded-lg  bg-card text-card-foreground shadow-[0 7px 38px -12px] shadow-[] border-border/50 cardShadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className=" w-[7rem]">
                      <img src={item.imagen || ''} alt={item.Name} className="w-full"/>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-2xl mb-1">{item.Name}</h3>
                      <p className="text-sm text-[#474646] mb-4">
                        {item.Description}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        ${item.Price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeToCart(item.id)}
                      className="!text-[#ff000099] !outline-none hover:text-destructive/90 !border-0 hover:bg-destructive/10 !p-0 flex hover:!text-red-700 hover:!border-none items-center justify-center !bg-transparent"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() =>
                        removeFromCart(item.id, true /* reducir cantidad */)
                      }
                      className=" bg-transparent hover:bg-white hover:!border-[#00718d] h-10 w-10 rounded-md flex items-center justify-center"
                    >
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <span className="font-semibold text-lg min-w-[3ch] text-center">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-transparent hover:bg-white hover:!border-[#00718d] h-10 w-10 rounded-md flex items-center justify-center"
                    >
                      <i class="fa-solid fa-plus"></i>
                    </button>
                    <span className="ml-auto text-lg font-semibold">
                      Subtotal: $<span className="text-[#00718d]">{(item.Price * (item.quantity || 1)).toFixed(2)}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de compra */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card text-card-foreground sticky top-6 border-primary/20 shadow-lg">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-semibold">Resumen de Compra</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex flex-col gap-3">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 bg-white text-primary hover:bg-white/90 font-semibold shadow-lg group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shopping-bag w-4 h-4"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Proceder al Pago
                </button>

                <button
                  onClick={clearCart}
                  className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full rounded-md text-sm font-medium"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
