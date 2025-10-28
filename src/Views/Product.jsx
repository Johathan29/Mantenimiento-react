import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import ProductModal from "../Components/ProductModal";
import { useCart } from "../contexts/CartContext";
import PathLocation from "../hooks/Location";
import TitlePage from "../Controllers/TitlePage";
import { motion,AnimatePresence } from "framer-motion";
import { LuSearchX } from "react-icons/lu";
import { initFlowbite } from "flowbite";
import { useSearchParams } from "react-router-dom";

export default function Products({ currentUser }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [countProducts, setcountProducts] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pathvalid,setPath]=useState('')
  const [price,setPrice]=useState(0)
  const [resultquery,setResultquery]=useState('')
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [active,setActive]=useState('')
const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  const api = import.meta.env.VITE_API_BASE_URL;
TitlePage()
 const path=PathLocation();
  
  // 🔍 Filtrar productos localmente
  useEffect(() => {
    if (!query.trim()) {
      setFiltered(products);
      return;
    }

    const search = query.toLowerCase();
    const results = products.filter(
      (p) =>
        p.Name.toLowerCase().includes(search) ||
        p.Description?.toLowerCase().includes(search) ||
        p.Category?.toLowerCase().includes(search)
    );
    setFiltered(results);
  }, [query, products]);

  // 🔗 Actualizar URL automáticamente al escribir
  useEffect(() => {
    if (query.trim()) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  }, [query, setSearchParams]);

  // ✅ Fetch products and categories
  useEffect(() => {
     setPath(path)
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${api}/api/products`);
      
        setProducts(res.data);
        setFiltered(res.data);
        
        setcountProducts(res.data.length)
        setCategories([...new Set(res.data.map(p => p.Category))]);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error al cargar los productos");
      }
    };
    fetchProducts();
  }, [api]);

  const handleFilter = (category) => {
    if (category === "all"){
      setFiltered(products)
      setcountProducts(products.length)
    } 
    else {
      
      setFiltered(products.filter(p => p.Category === category))
       };
       setcountProducts(filtered.length)
       setActive(category)
  };
useEffect(() => {
  initFlowbite()
  console.log(pathvalid)
  setcountProducts(filtered.length);
}, [filtered]);
  const handleAddToCart = (product) => addToCart(product);

  if (error) return <p className="text-red-600">{error}</p>;
 if(!products.length)return ( <div className="py-24 h-0 md:min-h-[44rem]"> <div className="rounded-xl w-1/2 bg-white flex justify-center shadow-xl container mx-auto ">
 <p className="text-black p-[4rem] text-2xl ">Cargando productos<span class="dots"></span></p></div></div>);
   function filterRange(price){
     setFiltered(products.filter(p => p.Price<=100 || p.Price<= price))
     setPrice(price)  
    }
      function resetColletion(){
     setFiltered(products)
    }
  
  return (
    <>
   <section  className="bg-hero-gradient"> 
    <div className="container mx-auto py-[4rem] z-30 ">
      <div className="block w-full text-center ">
          <div className="!leading-[1.2] flex text-sky-500 items-baseline justify-center gap-4"> 
            <i className="fa-solid fa-box-open text-4xl" ></i>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center  title text-transparent py-1">Catalogo de productos</h2>
          </div>
          <p className=" !text-[1.125rem] leading-[1.75rem] font-semibold text-gray-300 max-w-xl mx-auto text-center">Los más vendidos de la temporada</p>
      </div>
      {/* Selector de categoría
      {path!=='/'?
      <select
        className="border rounded-md p-2 mb-6"
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="all">Todas las categorías</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      :""} */}
      {/* Lista de productos */}
      
      <div className={path!=="/" ? "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5 px-6 py-[5rem] items-start " :
       "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-6 py-[5rem] items-start "}
      >
        {path!=='/'?
        <div className="lg:col-span-1 rounded-xl bg-black/20 backdrop-blur-sm p-6 rounded-lg shadow-sm md:h-[27rem] mx-6 md:mx-6 lg:mx-0 !h-auto">
          <div className="border-b-1 !p-[1rem] flex items-center justify-between   -m-[0.7px]">
            <p className="text-white text-lg font-bold">Filters</p>
            <button onClick={(()=>resetColletion())} className="btnreset !bg-transparent !text-white flex gap-2 items-center shadow-md  !cursor-pointer !transition-all !duration-200 px-4 py-2 !text-sm !font-[600] rounded-xl !bg-white/10 !text-white hover:!bg-white/40">
              <i className="fa-solid fa-eraser"></i>Reset
            </button>
          </div>
          
          <div className="block space-y-4">
          <div className="text-left py-2 px-[1rem] mt-[2rem]">
            <span className="block text-md font-medium text-gray-300 mb-1">Search Products:</span>
               <div className="flex items-center gap-2 flex-wrap relative">
                <i class="fa-solid fa-magnifying-glass absolute text-[#a5aab085] left-2 "></i>
                    <input type="search"  value={query}
          onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="px-[2rem] !border rounded-lg !border-gray-300  w-full h-[2.5rem] !transition-all !duration-200 !bg-gray-500 !text-gray-300 !bg-transparent "/>
                  
               </div>
              </div>
          <div className="text-left py-2 px-[1rem] ">
            <span className="block text-md font-medium text-gray-300 mb-1">Categories:</span>
               <div className="flex items-center gap-2 flex-wrap">
                    <button onClick={() => handleFilter("all")} value={'all'} className={active==='all' ?"!outline-none !px-4 !border-0 !py-2 !text-sm !font-[600] !rounded-full !bg-cyan-400 !text-slate-900 shadow-md  !cursor-pointer !transition-all !duration-200 ": "!outline-none shadow-md  !cursor-pointer !transition-all !duration-200 px-4 py-2 !text-sm !font-[600] rounded-full !border-0 !bg-white/10 !text-white hover:!bg-white/40"}>All</button>

                  {categories.map(cat => (
                    <button key={cat}  onClick={(e) => handleFilter(e.target.value)} value={cat} className={active===cat ?" !outline-none !px-4 !py-2 !text-sm !font-[600] !rounded-full !bg-cyan-400 !text-slate-900 shadow-md  !cursor-pointer !transition-all !duration-200 !border-0": "!outline-none shadow-md  !cursor-pointer !transition-all !duration-200 px-4 py-2 !text-sm !font-[600] !border-0 rounded-full !bg-white/10 !text-white hover:!bg-white/40"}>{cat}</button>
                  ))}
               </div>
              </div>
              <div class="relative text-left py-2 px-[1rem] ">
                <span class="block text-md font-medium text-gray-300 mb-1">Price Range:</span><label for="labels-range-input" class="sr-only">Labels range</label>
               <form action="" className="flex items-center gap-[1.2rem]">
                  <div className="w-full">
                      <input data-tooltip-target="tooltip-default" type="range" name="ragePrice" id="ragePrice"  min={100} max={10000} onChange={(e)=>filterRange(e.target.value)} className="block w-full   text-[.875rem] leading-[1.25rem] text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"/>
                      <div className="flex items-center justify-between gap-[0rem]">
                        <span class="text-[0.8rem] text-gray-500 dark:text-gray-400  start-0 -bottom-4">$100</span>
                        <span class="text-[0.8rem] text-gray-500 dark:text-gray-400    -bottom-4">$1500</span>
                        <span class="text-[0.8rem] text-gray-500 dark:text-gray-400    -bottom-4">$3000</span>
                        <span class="text-[0.8rem] text-gray-500 dark:text-gray-400    -bottom-4">$5000</span>
                        <span class="text-[0.8rem] text-gray-500 dark:text-gray-400    -bottom-4">$7000</span>
                        <span class="text-[0.8rem] text-gray-500 dark:text-gray-400    -bottom-4">$10000</span>
                        
                      </div>
                      <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
                        {price}
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
         :""}
        <div className="lg:col-span-3 md:col-span-2 min-h-full z-0 min-h-full z-0"> 
          {filtered.length===0 ? 
          <p className="text-white text-[2rem]">
            Cargando productos...
          </p> :""}
 
          {path!=='/'?
          <span className="px-6 pb-6 ">Showing {countProducts} products</span>
          :""}   
           
        <div className={path!=='/'?"grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-6 pt-6 ": "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 px-6 pt-6 "}>
           
         <AnimatePresence mode="wait">
            
          {
        path==='/'? 
        
        filtered.map((product) => (
           <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onOpenModal={() => setSelectedProduct(product)}
          /></motion.div>
        )).slice(0,4)
        :
          filtered.length > 0 ? (
        
        filtered.map((product) => (
           <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onOpenModal={() => setSelectedProduct(product)}
          /></motion.div>
        )) ) :( 
      <div className="rounded-md p-[4rem] bg-white w-full col-span-full">
            <motion.p
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#0f5167] text-[2.2rem] flex items-center justify-center text-center gap-6"
            >
              <LuSearchX  className="text-red-500 text-[4rem]"/>No match was found for the search criteria. “<span className="text-red-500">{query}</span>”
            </motion.p>
            </div>
          ) 
        }
      
        </AnimatePresence>

        </div>
        </div>
      </div>

      {/* Modal de producto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      {path==='/' ? 
      <div className="flex justify-center">
        <a href="/products"  className=" inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-11 group relative !bg-white hover:!bg-white/90 hover:!text-sky-700 !text-sky-400 font-bold text-lg px-8 py-6 rounded-full !shadow-lg hover:!shadow-xl transition-all duration-800 animate-pulse hover:animate-none active:scale-95">
             Ver Todos los Productos
           
              <span  className="absolute inset-0 rounded-full bg-[#fff] animate-ping">
              </span>
           
          </a>
        </div>
        :""}
      {/* <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 20px rgba(59,130,246,0.6)", // azul suave
      }}
      whileTap={{
        scale: 0.9,
        rotate: -3,
        boxShadow: "0 0 0 rgba(0,0,0,0)", // quita el brillo al click
      }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      
      className="mt-8 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
    >
      Ver más productos
    </motion.button> */}
    </div>
   </section> 
    </>
  );
}
