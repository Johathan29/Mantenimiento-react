/**
 * ProductCard Component
 * Muestra un producto con:
 * - Imagen con efecto hover
 * - Botón de favoritos animado
 * - Botón agregar al carrito
 * - Calificación interactiva (estrellas)
 * - Bloqueo para usuarios no logueados
 */

import { useState } from "react";
import { motion } from "framer-motion";
import notImg from "../assets/not-img.png";
import AccessDeniedModal from "./ModalDialog";
import { useProductRating } from "../Controllers/ratingController";

/* -------------------------------------------------------
   ⭐ Componente Star — Estrella individual interactiva
---------------------------------------------------------*/

/**
 * Renderiza una estrella con estado de hover y relleno dinámico.
 * @param {boolean} filled - Define si la estrella está activa.
 * @param {Function} onClick - Función al hacer click.
 */
function Star({ filled, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled || hover ? "rgb(250 204 21)" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5 cursor-pointer transition-colors text-yellow-400"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.123 0 0 0 1.597-1.16z" />
    </svg>
  );
}

/* -------------------------------------------------------
   🛒 ProductCard — Componente Principal
---------------------------------------------------------*/

/**
 * Card visual de un producto, con animaciones, calificación,
 * autorización y manejo de imágenes.
 */
export default function ProductCard({ product, onAddToCart, onOpenModal }) {
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [liked, setLiked] = useState(false);
  const [openAccessModal, setOpenAccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { rating, avgRating, totalVotes, vote } = useProductRating(product.id);

  /* -------------------------------------------------------
     🖼️ Cargar imagen dinámica del producto
  ---------------------------------------------------------*/

  /**
   * Obtiene la ruta de la imagen del producto desde /assets.
   * Si falla, devuelve una imagen por defecto.
   * @param {string} imageName
   */
  const getImagePath = (imageName) => {
    try {
      return require(`../../assets/${imageName}`);
    } catch {
      return notImg;
    }
  };

  const productImage = getImagePath(product.image);

  /* -------------------------------------------------------
     🔒 Helpers de autenticación
  ---------------------------------------------------------*/

  const requireLogin = (msg) => {
    if (!user) {
      setModalMessage(msg);
      setOpenAccessModal(true);
      return false;
    }
    return true;
  };

  /* -------------------------------------------------------
     🎨 Render principal
  ---------------------------------------------------------*/

  return (
    <>
      <AccessDeniedModal
        open={openAccessModal}
        onClose={() => setOpenAccessModal(false)}
        message={modalMessage}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5, boxShadow: "0px 8px 10px rgba(0,0,0,0.15)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-black/20 rounded-lg shadow-sm overflow-hidden group relative z-20"
      >
        {/* Imagen principal */}
        <div className="relative overflow-hidden aspect-square rounded-t-lg">

          {/* Botones superiores */}
          <div className="absolute flex items-center justify-between w-full px-6 py-4 z-50">

            {/* ❤️ Botón Like */}
            <motion.button
              whileTap={{ scale: 1.2 }}
              onClick={() => {
                if (!requireLogin("Debes iniciar sesión para calificar este producto.")) return;
                setLiked(!liked);
              }}
              className="text-red-500 bg-transparent p-0 border-0 focus:outline-none"
            >
              <motion.svg
                viewBox="0 0 24 24"
                animate={{ scale: liked ? 1.2 : 1, fill: liked ? "red" : "none" }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                stroke="currentColor"
                strokeWidth={2}
                className="w-6 h-6"
              >
                <path d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </motion.svg>
            </motion.button>

            {/* 🛒 Botón Carrito */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!requireLogin("Debes iniciar sesión para agregar productos.")) return;
                onAddToCart(product);
              }}
              className="text-[#9b9b0f] font-semibold py-2 px-4 rounded-full hover:text-[#d9d911] flex gap-1 items-center transition"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </motion.button>
          </div>

          {/* Fondo */}
          <motion.div
            className="w-full h-full rounded-t-lg object-cover bg-cover bg-center bg-no-repeat p-[2rem]"
            style={{ backgroundImage: `url(${product.imagen || notImg})` }}
            whileHover={{ scale: 1.05 }}
          />

          {/* Capa oscura click modal */}
          <div
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onOpenModal}
          />
        </div>

        {/* Contenido inferior */}
        <div className="flex items-center justify-between p-4 gap-2">
          <div className="w-1/2" onClick={onOpenModal}>
            <h4 className="font-semibold text-base text-white truncate hover:text-gray-400 cursor-pointer">
              {product.Name}
            </h4>

            <span className="text-md text-gray-300">
              {Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                product.Price
              )}{" "}
              USD
            </span>
          </div>

          {/* Estrellas */}
          <div className="flex items-center flex-wrap gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                filled={i + 1 <= rating}
                onClick={() => {
                  if (!requireLogin("Debes iniciar sesión para votar por este producto.")) return;
                  vote(i + 1);
                }}
              />
            ))}
            <span className="text-md text-gray-300 mt-1">
              ({avgRating.toFixed(1)}/5 · {totalVotes} votos)
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
