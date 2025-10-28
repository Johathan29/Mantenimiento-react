import Star from "./Star";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Truck, Shield, Package } from "lucide-react";
import notImg  from '../assets/not-img.png';
import { useProductRating } from "../Controllers/ratingController";
export default function ProductModal({ product, onClose, onAddToCart }) {
  const [activeTab, setActiveTab] = useState("descripcion");
  const [liked, setLiked] = useState(false);
  const { rating, avgRating, totalVotes, vote } = useProductRating(product.id);
  const tabs = [
    { id: "descripcion", label: "Descripción" },
    { id: "features", label: "Características" },
    { id: "specs", label: "Especificaciones" },
  ];

  const getTabClass = (tabId) =>
    `px-3 py-2 text-sm font-semibold border-b-2 transition-all duration-200 cursor-pointer whitespace-nowrap 
     ${
       activeTab === tabId
         ? "border-sky-500 text-sky-600"
         : "border-transparent text-gray-500 hover:text-sky-500 hover:border-sky-300"
     }`;

  // Variantes
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1,color:"oklch(55.1% 0.027 264.364)", transition: { staggerChildren: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0,color:"oklch(55.1% 0.027 264.364)", transition: { duration: 0.4, ease: "easeOut" } },
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "descripcion":
        return (
          <motion.ul
            key="descripcion"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="list-none text-sky-600 space-y-3 leading-relaxed"
          >
            {product.Description ? product.Description?.split(". ")
              .filter((line) => line.trim() !== "")
              .map((line, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="before:mr-2 text-sky-500 transition-colors"
                >
                  {line.trim()}.
                </motion.li>
              )): <motion.li
                  key={1}
                  variants={itemVariants}
                  className="before:mr-2 before:text-sky-500"
                >
                 No tiene ninguna descripcion este producto
                </motion.li>}
          </motion.ul>
        );

      case "features":
        return (
          <motion.ul
            key="features"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="list-disc pl-5 text-gray-600 space-y-2"
          >
            {product.caracteristicas ? product.caracteristicas?.map((feature, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="text-sky-500 transition-colors"
              >
                {feature}
              </motion.li>
            )): <motion.li
                key={1}
                variants={itemVariants}
                className="text-sky-500 transition-colors"
              >
                No tiene ninguna caracteristicas este producto
              </motion.li>}
          </motion.ul>
        );

      case "specs":
        return (
          <motion.div
            key="specs"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid sm:grid-cols-1 gap-3 text-sm text-gray-700"
          >
            {product.especificaciones ?
            <motion.div
              variants={itemVariants}
              className="border border-gray-100 rounded-md shadow-md p-3 bg-gray-50 hover:bg-gray-100 transition space-y-2"
            >
              <p><span className="font-semibold text-sky-600">Marca:</span> {product.especificaciones.marca}</p>
              <p><span className="font-semibold text-sky-600">Modelo:</span> {product.especificaciones.modelo}</p>
              <p><span className="font-semibold text-sky-600">Garantía:</span> {product.especificaciones.garantía}</p>
              <p><span className="font-semibold text-sky-600">En stock:</span> {product.especificaciones.En_Stock}</p>
            </motion.div>
          :
          <motion.div
              variants={itemVariants}
              className="border border-gray-100 w-full  rounded-md shadow-md p-3 bg-gray-50 hover:bg-gray-100 transition space-y-2"
            >
              <p> No tiene ninguna especificaciones este producto </p>
            </motion.div>  
          }
          </motion.div>
        );

      default:
        return null;
    }
  };

  const items = [
    { icon: <Truck className="h-6 w-6 text-sky-600 mb-1" />, label: "Envío gratis" },
    { icon: <Shield className="h-6 w-6 text-sky-600 mb-1" />, label: "Garantía 2 años" },
    { icon: <Package className="h-6 w-6 text-sky-600 mb-1" />, label: "Devolución 30 días" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariantsfooter = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-lx md:max-w-7xl shadow-lg relative overflow-y-auto max-h-[100vh]">
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 rounded-full !bg-transparent !text-white h-8 w-8 flex items-center !text-lg !outline-none !p-0 justify-center !border-0 transition"
        >
         <i class="fa-solid fa-circle-xmark !text-[#fa0505]" ></i>
        </button>

        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Imagen y beneficios */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className={"relative aspect-square rounded-lg overflow-hidden !bg-gray-100 flex items-center bg-cover  justify-center bg-[url("+product.imagen || notImg+")]"}>
              
            </div>

            <motion.div
              className="grid grid-cols-3 gap-2 sm:gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariantsfooter}
                  className="flex flex-col items-center text-center p-2 sm:p-3 bg-gray-100 rounded-lg hover:scale-105 transition-transform"
                >
                  {item.icon}
                  <p className="text-xs text-gray-600">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Info y acciones */}
          <div className="flex-1 w-full md:w-1/2 flex flex-col">
            <h2 className="!text-[1.5rem] font-bold max-w-lg mb-3">
              <span className="!bg-gradient-to-r !from-[#24278f] !via-[#5c2eb8] !to-[#00bfff] !bg-clip-text text-transparent  ">{product.Name}</span></h2>
            
              <div className="flex items-center flex-wrap gap-[0.2rem] mt-2">
        {[...Array(5)].map((_, index) => {
          const value = index + 1;
          return (
          <Star
            key={value}
            filled={value <= rating}
            onClick={() => vote(value)}
          />
        );
        })}
       <span className="text-md text-gray-300 mt-1">
            ({avgRating.toFixed(1)}/5 · {totalVotes} votos)
        </span>
      </div>

            <p className="!bg-gradient-to-r !from-[#24278f] !via-[#5c2eb8] !to-[#00bfff] text-[1.4rem] !bg-clip-text text-transparent py-[0.5rem] mb-3">
            {`${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.Price)} USD`}
            </p>
            <div className="flex items-center justify-between gap-4 mb-4">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 !bg-sky-500 !text-white !py-2 rounded-lg hover:!bg-sky-600 transition"
              >
                Agregar al carrito
              </button>
              <button class="flex-1 !border-0 !text-white !py-2 rounded-lg opacity-[1] hover:opacity-[.9] !bg-gradient-to-r !from-[#24278f] !via-[#5c2eb8] !to-[#00bfff]  transition flex gap-2 items-center justify-center"> 
                <i class="fa-solid fa-credit-card"></i> 
                Comprar
              </button>
              <motion.button
                whileTap={{ scale: 1.2 }}
                onClick={() => setLiked(!liked)}
                className="!text-red-500 p-2 !bg-transparent !p-0 !border-0 !outline-none hover:!border-0 focus:!outline-none "
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ scale: liked ? 1.2 : 1, fill: liked ? "red" : "none" }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                  />
                </motion.svg>
              </motion.button>
            </div>
            <div class="mb-4 h-auto ">
              <span class="text-md flex items-center gap-2 text-gray-500 mb-2"> 
                <i class="fa-solid fa-share-nodes text-sky-500"></i> 
                Compartir
              </span>
              <ul class="flex items-center gap-1">
                <li class="w-max !p-0">
                  <a class="!text-[1.1rem] hover:!text-sky-500 cursor-pointer !p-0">
                    <i class="fa-brands fa-facebook">
                    </i>
                  </a>
                </li>
                <li class="w-max !p-0">
                  <a class="!text-[1.1rem] hover:!text-sky-500 cursor-pointer !p-0">
                    <i class="fa-brands fa-x-twitter"></i>
                  </a>
                </li>
                <li class="w-max !p-0">
                  <a class="!text-[1.1rem] hover:!text-sky-500 cursor-pointer !p-0">
                    <i class="fa-brands fa-whatsapp"></i>
                  </a>
                </li>
                <li class="w-max !p-0">
                  <a class="!text-[1.1rem] hover:!text-sky-500 cursor-pointer !p-0">
                    <i class="fa-solid fa-link"></i>
                  </a>
                </li>
              </ul>
            </div>
            {/* Tabs */}
            <div className="border-b border-gray-200 flex item-center justify-between gap-3 overflow-x-auto scrollbar-hide ">
              {tabs.map((tab) => (
                <span
                  key={tab.id}
                  className={getTabClass(tab.id)}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </span>
              ))}
            </div>

            {/* Contenido con animación */}
            <div className="mt-4 min-h-[120px]">
              <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
