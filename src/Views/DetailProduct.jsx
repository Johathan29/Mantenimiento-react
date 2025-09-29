import { useEffect, useState } from "react";
import { productController } from '../Controllers/productController';
import { NavLink } from "react-router-dom";
import {useProductRating} from '../Controllers/ratingController'
function ProductCard({ product }) {
  const { rating, avgRating, totalVotes, vote } = useProductRating(product.id);

  return (
    <div>
      <h3>{product.Name}</h3>

      {/* Estrellas */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} filled={i + 1 <= rating} onClick={() => vote(i + 1)} />
        ))}
      </div>

      <p className="text-sm text-gray-500">
        Promedio: {avgRating.toFixed(1)} ⭐ ({totalVotes} votos)
      </p>
    </div>
  );
}

 function DetailProduct()
{
    const [rating, setRating] = useState(0); // Estado para guardar el número de estrellas seleccionadas
  const [hover, setHover] = useState(0);   // Estado para el efecto hover
  const [liked, setLiked] = useState(false); // ❤️ estado para "me gusta"
   const [datacollection, setCollection] = useState([]);
  const {fetchproduct,useProductRating}=productController
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  async function getUserIP() {
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
   return data.ip;
}
useEffect(()=>{
  async function fetchData() {
       try {
            const data = await fetchproduct();
             setCollection(data);
            }
            catch {
              console.error('Error fetching users:', err);
              setError(err);
            }
            finally {
              setLoading(false);
            };
    }
    fetchData();
  }, []);
  let sum = 0;
console.log(datacollection)
// ⭐ Cambiar rating por producto
  const setProductRating = (id, value) => {
    setCollection(prev =>
      prev.map(p =>
        p.id === id ? { ...p, rating: value } : p
      )
    );
    getUserIP()
  };
    return (
            <section className="bg-[#0f5168] py-[3rem] font-[ui-sans-serif]" >
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#0f5169] shadow-lx  p-8  mb-12">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Productos Destacados</h2>
                            <p className="text-md text-white max-w-xl mx-auto">
                                Visualiza de un vistazo el rendimiento de tu negocio con métricas en tiempo real, gráficos dinámicos y fáciles de interpretar, e información centralizada para una mejor toma de decisiones.
                            </p>
                        </div>
                        <div className="rounded-lg  border p-[3rem] bg-[#f0f8ff] space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 " >
                            {loading ?
                                <h1 className="uppercase bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                                    Loading<span className='text-red-500'>...</span>
                                </h1>
                            :''}

                            {datacollection.map(product=>                             
                            <div key={product.id} className="rounded-lg text-card-foreground shadow-sm bg-white shadow-lg hover:shadow-xl border border-border/50 transition-smooth hover:scale-[1.02] hover:border-primary/20 group cursor-pointer overflow-hidden">
                                <div  className="aspect-square w-full overflow-hidden p-[1rem]">
                                    <img src={product.imagen} alt="Smartphone Pro Max" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                </div>
                                <div  className="flex flex-col space-y-1.5 p-6 pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-h-[5rem] h-[5rem]">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="tracking-tight text-lg font-semibold text-[#1c1d1e]">{product.Name}</h3>
                                              {/* ❤️ Botón Me gusta (arriba a la derecha) */}
                                                <button
                                                onClick={() => setLiked(!liked)}
                                               className=" !bg-white/80  p-2  !border-none hover:!border-none focus:!outline-none hover:scale-110 transition focus-visible:!outline-none"
                                                >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill={liked ? "red" : "none"}
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                   className="w-6 h-6 text-red-500"
                                                >
                                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                                </svg>
                                                </button>
                                            </div>
                                            <p className="text-[.875rem] text-[#73888c] !font-[ui-sans-serif]">{product.Description.length<=100 ? product.Description.substring(0, 95): product.Description.substring(0, 95)+'...'}</p>
                                        </div>
                                    </div>
                                     <div className="flex items-center gap-1 mt-2">
                                        {[...Array(5)].map((_, index) => {
                                        const value = index + 1;
                                        return (
                                            <Star
                                            key={value}
                                            filled={value <= product.ranking}
                                            onClick={() => setProductRating(product.id, value)}
                                            />
                                        );
                                        })}
                                        <span className="text-xs text-gray-600 ml-1">
                                        ({product.rating}/5)
                                        </span>
                                </div>
                            </div>
                            <div data-lov-id="src/components/ProductCard.tsx:94:6" data-lov-name="CardContent" data-component-path="src/components/ProductCard.tsx" data-component-line="94" data-component-file="ProductCard.tsx" data-component-name="CardContent" data-component-content="%7B%7D" className="p-6 pt-0">
                                <div  className="flex items-center justify-between mb-4">
                                    <div  className="text-2xl font-bold text-[#00718da3] font-[ui-sans-serif] group-hover:text-[#00718d] transition-smooth">
                                       {product.Price}
                                    </div>
                                    <div  className={product.Amount>0 ? "inline-flex items-center bg-[#0f930d] font-[ui-sans-serif] rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 text-xs":"inline-flex items-center bg-red-500 font-[ui-sans-serif] rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 text-xs"}>
                                        {product.Amount>0 ? 'in Stock' : 'Agotado'}
                                    </div>
                                
                            </div>
                            {product.Amount>0 ?
                            <button  id="btn-ordernar" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart w-4 h-4 mr-2" data-lov-id="src/components/ProductCard.tsx:113:10" data-lov-name="ShoppingCart" data-component-path="src/components/ProductCard.tsx" data-component-line="113" data-component-file="ProductCard.tsx" data-component-name="ShoppingCart" data-component-content="%7B%22classNameName%22%3A%22w-4%20h-4%20mr-2%22%7D">
                                    <circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle>
                                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                                </svg>Ordenar
                            </button>
                            :
                            <button  disabled className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart w-4 h-4 mr-2" data-lov-id="src/components/ProductCard.tsx:113:10" data-lov-name="ShoppingCart" data-component-path="src/components/ProductCard.tsx" data-component-line="113" data-component-file="ProductCard.tsx" data-component-name="ShoppingCart" data-component-content="%7B%22classNameName%22%3A%22w-4%20h-4%20mr-2%22%7D">
                                    <circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle>
                                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                                </svg>Ordenar
                            </button>
                            }
                        </div>
                    </div>             
                ).slice(0,2)}
                </div>
                <NavLink to={'/products'} className=" !text-[#00718db8] p-[0.4rem] w-max hover:!text-[#00718d] hover:transition !font-[ui-sans-serif] !underline">Ver Tienda</NavLink>
                </div>
                
            </div>
        </div>
    </section>
        
    )
}

// ⭐ Componente Star independiente
function Star({ filled, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled || hover ? "rgb(250 204 21)" : "none"}
      stroke="currentColor"
      strokeWidth="2"
     className="w-5 h-5 cursor-pointer transition-colors text-yellow-400"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}
export default DetailProduct;