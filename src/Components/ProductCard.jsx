import { useState } from "react";
import { motion } from "framer-motion";
import PathLocation from "../hooks/Location";
import notImg from '../assets/not-img.png'
import {useProductRating} from '../Controllers/ratingController'
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
export default function ProductCard({ product, onAddToCart, onOpenModal }) {
  const [liked, setLiked] = useState(false);
const { rating, avgRating, totalVotes, vote } = useProductRating(product.id);
 const setProductRating = (id, value) => {
    setCollection(prev =>
      prev.map(p =>
        p.id === id ? { ...p, rating: value } : p
      )
    );
    getUserIP()
  };
  
  return (
    <>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, boxShadow: "0px 8px 10px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-black/20  rounded-lg shadow-sm overflow-hidden group"
       onClick={onOpenModal}
    >
      <div className="relative overflow-hidden aspect-square rounded-t-lg w-full h-[24rem] md:h-auto">
        <div className="absolute flex items-center justify-end w-full z-50 px-6 py-4">
          

            {/* Botón corazón animado */}
            <motion.button
              whileTap={{ scale: 1.2 }}
              onClick={() => setLiked(!liked)}
              className="focus:outline-none !outline-none !text-red-500 !bg-transparent !p-0 !border-0"
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
            <motion.img
        src={product.imagen || notImg}
        alt={product.Name}
        className={"w-full hover:brightness-50 h-full rounded-t-lg object-cover transition-transform duration-500 bg-contain p-[2rem]  bg-center bg-no-repeat"}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
       
      >
        </motion.img>
        <div class="absolute inset-0 !bg-[#00000096] bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onAddToCart(product)}
          className="!bg-cyan-400 !text-slate-600 !font-semibold py-2 px-4 !rounded-full hover:!bg-cyan-300 flex gap-1 items-center transition"
        >
          <i class="fa-solid fa-cart-shopping"></i>
         Add to Cart
        </motion.button>
          
        </div>
    </div>
     <div className="flex items-center justify-between  py-4 gap-2 bg-white  ">
      <div className="mt-2 w-2/3 mx-4">
        <h2 className="!text-[1.5rem] font-bold max-w-lg mb-3">
          <span className="!bg-gradient-to-r !from-[#24278f] !via-[#5c2eb8] !to-[#00bfff] !bg-clip-text text-transparent  ">{product.Name}</span></h2>
          <span className="text-md !bg-gradient-to-r !from-[#24278f] !via-[#5c2eb8] !to-[#00bfff] !bg-clip-text text-transparent mt-1">
            {`${new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product.Price)} USD`}
          </span>
      </div>
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
      </div>
    </motion.div>
    </>
  );
}
