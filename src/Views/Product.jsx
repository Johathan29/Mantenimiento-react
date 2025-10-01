import { useEffect, useState } from "react";
import { productController } from '../Controllers/productController';
import { NavLink } from "react-router-dom";
import {useProductRating} from '../Controllers/ratingController'
import PathLocation from '../Hooks/Location';
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

      <p className="text-[.875rem] leading-[1.25rem] text-gray-500">
        Promedio: {avgRating.toFixed(1)} ⭐ ({totalVotes} votos)
      </p>
    </div>
  );
}

 function ProductComponent()
{
    const [rating, setRating] = useState(0); // Estado para guardar el número de estrellas seleccionadas
  const [hover, setHover] = useState(0);   // Estado para el efecto hover
  const [liked, setLiked] = useState(false); // ❤️ estado para "me gusta"
   const [datacollection, setCollection] = useState([]);
  const {fetchproduct,useProductRating}=productController
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [getCategory, setCategory] = useState([]);
  async function getUserIP() {
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
   return data.ip;
}
const path = PathLocation();
useEffect(()=>{
  async function fetchData() {
       try {
            const data = await fetchproduct();
            //const category=data.map(item=> item.category)
            setCategory(data)
             setCollection(data);
            }
            catch {
              console.error('Error fetching users:', err);
              setError(err);
            }
            finally {
              setLoading(false);
            };
    };
   
  
    fetchData();
  }, []);
  async function filterCategory(category){
 var data = await fetchproduct();
 const filtedata=data.filter(item=>item.Category===category)
             category==="all"? setCollection(data):setCollection(filtedata);
    }
  async function filterRange(price){
      const data = await fetchproduct();
 const filtedata=data.filter(item=>item.Price>=100 && item.Price<= price)
             setCollection(filtedata);
             console.log(price)
    }
   async function resetColletion(){
      const data = await fetchproduct();
            //const category=data.map(item=> item.category)
            
             setCollection(data);
    }
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
                        </div>
                      </div>
                      <div className="container mx-auto">
                        <div className="rounded-lg  border p-[3rem] bg-[#f0f8ff] space-y-6">
                          <div className="max-w-7xl mx-auto">
                              {path == '/products' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6  p-8 itemsp-center shadow-xl bg-white rounded-md mx-[2rem]">
                                <div className="block">
                                    <label for="default-search" class="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif] font-bold">Search</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 end-2 flex items-center ps-3 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                            </svg>
                                        </div>
                                        <input type="search" id="default-search" class="block w-full h-[2rem] ps-10 text-[.875rem] leading-[1.25rem] text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                                    </div>
                                </div>
                                <div className="block items-center gap-4">
                                    <span className="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif] font-bold">Categories:</span>
                                    <form action="" className="w-full flex items-center">
                                    <select name="category" id="category" onChange={(e) => filterCategory(e.target.value)} className="block w-full h-[2rem] ps-10 text-[.875rem] leading-[1.25rem] text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500">
                                        <option value="all">
                                            Seleccionar una categoria
                                        </option>
                                        {getCategory.map(category =>
                                        <option value={category.Category}>
                                            {category.Category}
                                        </option>
                                        )}
                                    </select>
                                    
                                    </form>
                                </div>
                                <div className="block items-center gap-4">
                                    <span className="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif] font-bold">Prices:</span>
                                    <div class="relative  w-full leading-[1.2]">
                                      <form action="" className="flex items-center gap-[1.2rem]">
                                        <div>
                                            <input type="range" name="ragePrice" id=""  min={100} max={10000} onChange={(e)=>filterRange(e.target.value)} className="block w-full   text-[.875rem] leading-[1.25rem] text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"/>
                                            <div className="flex items-center justify-between gap-[1.5rem]">
                                              <span class="text-[0.8rem] text-gray-500 dark:text-gray-400  start-0 -bottom-4">$100</span>
                                              <span class="text-[0.8rem] text-gray-500 dark:text-gray-400    -bottom-4">$1000</span>
                                              <span class="text-[0.8rem] text-gray-500 dark:text-gray-400    -bottom-4">$2000</span>
                                              <span class="text-[0.8rem] text-gray-500 dark:text-gray-400    -bottom-4">$5000</span>
                                              <span class="text-[0.8rem] text-gray-500 dark:text-gray-400    -bottom-4">$8000</span>
                                              <span class="text-[0.8rem] text-gray-500 dark:text-gray-400    -bottom-4">$10000</span>
                                              
                                            </div>
                                        </div>
                                        <input type="reset" value="Reset Price" onClick={()=>resetColletion()} className="text-gray-400 rounded-lg border p-[0.2rem] bg-white"/>
                                      </form>
                                       {/* <input id="minmax-range" type="range" min="0" max="10" value="5" className="block w-full  ps-10 text-[.875rem] leading-[1.25rem] text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"/>*/}
                                        
                                    </div>

                                </div>
                            </div>
                              )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6  p-8 " >
                            {loading ?
                                <h1 className="uppercase bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                                    Loading<span className='text-red-500'>...</span>
                                </h1>
                            :''}

                            {datacollection.map((product)=>                             
                            <div key={product.id} className=" animate-scale-in rounded-lg text-black shadow-sm bg-white shadow-lg hover:shadow-xl border border-gray-100  transition-smooth hover:scale-[1.02] hover:border-primary/20 group cursor-pointer overflow-hidden">
                                <div  className="aspect-square w-full overflow-hidden p-[1rem] relative">
                                    <img src={product.imagen} alt="Smartphone Pro Max" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    <div class="absolute inset-0 md:h-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" >
                                       <button onClick={() => {
                                            setSelectedProduct(product);
                                          setIsOpen(true) }} class="inline-flex  hover:!border-white items-center justify-center gap-[0.2rem] whitespace-nowrap text-[.875rem] leading-[1.25rem] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 rounded-md px-3 hover:!bg-[#807f7fd9] font-bold !bg-[#808080a6] !text-white ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye w-4 h-4" >
                                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                                          </path>
                                          <circle cx="12" cy="12" r="3">
                                          </circle>
                                        </svg>Ver detalles
                                      </button>
                                  </div>
                                </div>
                                <div  className="flex flex-col space-y-1.5 p-6 pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-h-[5rem] h-[7rem]">
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
                                            <p className="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif]">{product.Description}</p>
                                        </div>
                                    </div>
                                     <div className="flex items-center gap-1 mt-2">
                                        {[...Array(5)].map((_, index) => {
                                        const value = index + 1;
                                        return (
                                            <Star
                                            key={value}
                                            filled={value <= product.ratings}
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
                                       {`${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.Price)} USD`}
                                    </div>
                                    <div  className={product.Amount>0 ? "inline-flex items-center bg-[#0f930d] font-[ui-sans-serif] rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-white hover:bg-primary/80 text-xs":"inline-flex items-center bg-red-500 font-[ui-sans-serif] rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-white hover:bg-primary/80 text-xs"}>
                                        {product.Amount>0 ? 'in Stock' : 'Agotado'}
                                    </div>
                                
                            </div>
                            
                            {product.Amount>0 ?
                            <div className="flex items-center gap-2">
                            <button  id="btn-ordernar" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-[.875rem] leading-[1.25rem] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-white hover:bg-primary/90 h-9 rounded-md px-3 w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart w-4 h-4 mr-2" data-lov-id="src/components/ProductCard.tsx:113:10" data-lov-name="ShoppingCart" data-component-path="src/components/ProductCard.tsx" data-component-line="113" data-component-file="ProductCard.tsx" data-component-name="ShoppingCart" data-component-content="%7B%22classNameName%22%3A%22w-4%20h-4%20mr-2%22%7D">
                                    <circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle>
                                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                                </svg>Ordenar
                            </button>
                            <button onClick={() => {      
                                      setSelectedProduct(product);
                                    setIsOpen(true) }} class="inline-flex md:hidden hover:!border-white items-center justify-center gap-[0.2rem] whitespace-nowrap text-[.875rem] leading-[1.25rem] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 rounded-md px-3 hover:!bg-[#807f7fd9] font-bold !bg-linear-65 from-zinc-900 to-white  !text-white ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye w-4 h-4 mr-2" >
                                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                                          </path>
                                          <circle cx="12" cy="12" r="3">
                                          </circle>
                                        </svg>Ver detalles
                                      </button>
                                      </div>
                            :
                            <div className="flex items-center">
                            <button  disabled className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-[.875rem] leading-[1.25rem] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-white hover:bg-primary/90 h-9 rounded-md px-3 w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart w-4 h-4 mr-2" data-lov-id="src/components/ProductCard.tsx:113:10" data-lov-name="ShoppingCart" data-component-path="src/components/ProductCard.tsx" data-component-line="113" data-component-file="ProductCard.tsx" data-component-name="ShoppingCart" data-component-content="%7B%22classNameName%22%3A%22w-4%20h-4%20mr-2%22%7D">
                                    <circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle>
                                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                                </svg>Ordenar
                            </button>
                            <button disabled onClick={() => {      
                                      setSelectedProduct(product);
                                    setIsOpen(true) }} class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-[.875rem] leading-[1.25rem] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 rounded-md px-3 bg-white/90 text-foreground hover:bg-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye w-4 h-4 mr-2" >
                                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                                          </path>
                                          <circle cx="12" cy="12" r="3">
                                          </circle>
                                        </svg>Ver detalles
                                      </button>
                                      </div>
                            }
                              </div>
                        </div>      
                        )}
                        </div>
                 {isOpen===true  && selectedProduct  ? (
                  <div   class="fixed top-0 left-0 right-0 z-50  bg-[#48474787] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full z-50">
                      <div class="relative w-full max-w-7xl max-h-full">
                    
                          <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            
                              <div  class="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white text-[#495659] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto" tabindex="-1" >
                    <div  class="flex flex-col space-y-1.5 text-center sm:text-left">
                      <h2 class="tracking-tight text-lg font-semibold text-[#1c1d1e]">
                        {selectedProduct.Name}
                      </h2>
                    </div>
                    <div data-lov-id="src/components/ProductDetail.tsx:75:8" data-lov-name="div" data-component-path="src/components/ProductDetail.tsx" data-component-line="75" data-component-file="ProductDetail.tsx" data-component-name="div" data-component-content="%7B%22className%22%3A%22grid%20grid-cols-1%20md%3Agrid-cols-2%20gap-6%20mt-4%22%7D" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div data-lov-id="src/components/ProductDetail.tsx:77:10" data-lov-name="div" data-component-path="src/components/ProductDetail.tsx" data-component-line="77" data-component-file="ProductDetail.tsx" data-component-name="div" data-component-content="%7B%22className%22%3A%22space-y-4%22%7D" class="space-y-4">
                        <div  class="aspect-square w-full overflow-hidden rounded-lg border border-border h-full">
                          <img  src={selectedProduct.imagen} alt="Smartphone Pro Max" class="w-full h-full object-contain transition-transform duration-300 hover:scale-105"/>
                        </div>
                      </div>
                      <div class="space-y-2">
                        <div class="flex items-center justify-between mb-[-0.3rem]">
                          <div class="text-3xl font-bold text-[#00718d]">
                            $899.99
                          </div>
                          <div  class="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#0f930d] text-white hover:bg-primary/80 text-[.875rem]">
                            En Stock
                          </div>
                        </div>
                        <div class="flex items-center gap-2">
                          <div className="flex items-center gap-1 mt-2">
                                        {[...Array(5)].map((_, index) => {
                                        const value = index + 1;
                                        return (
                                            <Star
                                            key={value}
                                            filled={value <= selectedProduct.ranking}
                                            onClick={() => setProductRating(selectedProduct.id, value)}
                                            />
                                        );
                                        })}
                                        <span className="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif]">
                                        ({selectedProduct.rating}/5)
                                        </span>
                                </div>
                        </div>
                        <div >
                          <h3 class="text-lg font-semibold text-black mb-2">
                            Descripción
                          </h3>
                          <p  class="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif]">
                            Teléfono inteligente de última generación con cámara avanzada y procesador de alto rendimiento
                          </p>
                        </div>
                        <div className="flex gap-2 items-center justify-between">
                          <div >
                            <h3  class="text-lg font-semibold text-black mb-3">
                              Características
                            </h3>
                            <div class="grid grid-cols-1 gap-2">
                              <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big w-4 h-4 text-primary flex-shrink-0" >
                                  <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                  <path d="m9 11 3 3L22 4"></path>
                                </svg>
                                <span  class="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif]">
                                  Alta calidad premium
                                </span>
                              </div>
                              <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big w-4 h-4 text-primary flex-shrink-0" >
                                  <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                  <path d="m9 11 3 3L22 4"></path>
                                </svg>
                                <span class="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif]">
                                  Diseño ergonómico
                                </span>
                              </div>
                              <div  class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big w-4 h-4 text-primary flex-shrink-0" >
                                  <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                  <path d="m9 11 3 3L22 4"></path>
                                </svg>
                                <span class="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif]">
                                  Tecnología avanzada
                                </span>
                              </div>
                              <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big w-4 h-4 text-primary flex-shrink-0" >
                                  <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                  <path d="m9 11 3 3L22 4"></path>
                                </svg>
                                <span  class="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif]">
                                  Fácil de usar
                                </span>
                              </div>
                            </div>
                          </div>
                          <div >
                            <h3 class="text-lg font-semibold text-black mb-3">
                              Especificaciones
                            </h3>
                          <div class="grid grid-cols-1 gap-2">
                            <div  class="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big w-4 h-4 text-accent flex-shrink-0" >
                                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                <path d="m9 11 3 3L22 4"></path>
                              </svg>
                              <span class="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif]">
                                Garantía de 1 año
                              </span>
                            </div>
                            <div  class="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big w-4 h-4 text-accent flex-shrink-0" >
                                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                <path d="m9 11 3 3L22 4"></path>
                              </svg>
                              <span  class="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif]">
                                Envío gratuito
                              </span>
                            </div>
                          <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big w-4 h-4 text-accent flex-shrink-0" >
                              <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                              <path d="m9 11 3 3L22 4"></path>
                            </svg>
                            <span class="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif]">
                              Devolución en 30 días
                            </span>
                          </div>
                        <div  class="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big w-4 h-4 text-accent flex-shrink-0" >
                            <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                            <path d="m9 11 3 3L22 4"></path>
                          </svg>
                          <span class="text-[.875rem] leading-[1.25rem] text-[#73888c] !font-[ui-sans-serif]">
                            Soporte técnico 24/7
                          </span>
                        </div>
                      </div>
                    </div>
                    </div>
                  <div class="space-y-3 pt-4 border-t border-border">
                    <button   class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-[.875rem] leading-[1.25rem] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-white hover:bg-primary/90 h-11 rounded-md px-8 w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart w-5 h-5 mr-2" >
                        <circle cx="8" cy="21" r="1"></circle>
                        <circle cx="19" cy="21" r="1"></circle>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                      </svg>
                      Agregar al carrito
                    </button>
                      <div  class="flex gap-2">
                        <button  class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-[.875rem] leading-[1.25rem] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 flex-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart w-4 h-4 mr-2 fill-red-500 text-red-500" >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                          </svg>
                          En favoritos
                        </button>
                        <button  class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-[.875rem] leading-[1.25rem] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share2 w-4 h-4" >
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                          </svg>
                        </button>
                        <button  class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-[.875rem] leading-[1.25rem] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark w-4 h-4" >
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>
                  <button type="button"  onClick={() => setIsOpen(false)} class="absolute right-4 top-4 !bg-white !text-red-500 !rounded-full !border-red-500 opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-[#495659] hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x h-4 w-4" >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                    <span  class="sr-only">Close</span>
                  </button>
                  </div>
                          </div>
                      </div>
                  </div>

                   ):''}
                {path !== '/products' && (
                <NavLink to={'/products'} className=" !text-[#00718db8] p-[0.4rem] w-max hover:!text-[#00718d] hover:transition !font-[ui-sans-serif] !underline">Ver Tienda</NavLink>
                )}
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

export default ProductComponent;
