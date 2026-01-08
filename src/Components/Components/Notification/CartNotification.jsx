import { motion, AnimatePresence } from "framer-motion";

export default function CartNotification({ message, type = "info", onClose }) {
  const colors = {
    success: "bg-green-500 border-green-400 text-white",
    error: "bg-red-500 border-red-400",
    warning: "bg-yellow-500 border-yellow-400 text-gray-800",
    info: "bg-blue-500 border-blue-400",
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-auto max-w-md"
        >
          <div
            className={`flex items-center gap-3 px-5 py-3 text-white font-medium rounded-xl shadow-lg border ${colors[type]} `}
          >
            {type === "success" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            )}
            {type === "error" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            {type === "warning" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0 3.75h.007v.008H12v-.008z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.34 3.94a1.5 1.5 0 0 1 3.32 0l8.337 14.4A1.5 1.5 0 0 1 20.338 21H3.662a1.5 1.5 0 0 1-1.66-2.66L10.34 3.94z"
                />
              </svg>
            )}
            <span>{message}</span>
            <button
              onClick={onClose}
              className="ml-3 !bg-transparent !border-0 !p-0 !outline-none !text-white hover:!text-gray-200 transition"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
