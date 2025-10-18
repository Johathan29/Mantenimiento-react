import { motion, AnimatePresence } from "framer-motion";

export default function ModalMsg({ show, setShow, title, message, type = "info" }) {
  const colors = {
    success: "bg-green-100 border-green-400 text-green-800",
    error: "bg-red-100 border-red-400 text-red-800",
    info: "bg-blue-100 border-blue-400 text-blue-800",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[9999] backdrop-blur-sm bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className={`border ${colors[type]} rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center`}
          >
            <h2 className="text-2xl font-bold mb-3">{title}</h2>
            <p className="text-base mb-4">{message}</p>
            <button
              onClick={() => setShow(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
