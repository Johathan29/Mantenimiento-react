// components/AccessDeniedModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function AccessDeniedModal({ open, onClose, message }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Contenedor del modal */}
        <motion.div
          className="bg-[#1e1e1e] p-6 rounded-xl shadow-xl w-[90%] max-w-sm text-center border border-gray-700 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          {/* Cerrar */}
          <button
            onClick={onClose}
            className="absolute -top-[.9rem] -right-[.4rem] rounded-full border-[#374151] w-[2rem] p-[4px] border-1 text-white bg-[#1e1e1e] hover:text-white hover:bg-[#ef4444]  group"
          >
            <i class="fa-solid fa-xmark text-[15px]"></i>
          </button>

          {/* Icono */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-4 flex justify-center"
          >
            <div className="bg-red-500/20 p-4 rounded-full">
              <i className="fa-solid fa-circle-exclamation text-red-500 text-4xl"></i>
            </div>
          </motion.div>

          <h2 className="text-xl text-white font-semibold mb-2">Acceso Denegado</h2>

          <p className="text-gray-300 mb-6">
            {message || "Debes iniciar sesión para continuar."}
          </p>

          <button
            onClick={() => (location.href = "/login")}
            className="w-full bg-cyan-400 text-gray-800 py-2 rounded-lg font-semibold hover:bg-cyan-300 transition"
          >
            Ir al Login
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
