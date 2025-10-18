// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./Routes/routes.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx"; // Asegúrate de tener este contexto creado
import "./index.css";
import { CartProvider } from "./contexts/CartContext.jsx";
// 🔧 crea el router a partir del array de rutas
const router = createBrowserRouter(routes);

// 🧱 error boundary simple para capturar errores del Router
function ErrorBoundary({ error }) {
  console.error("❌ Router error:", error);
  return (
    <div className="p-10 text-center text-red-600 font-bold">
      ❌ Ocurrió un error al cargar las rutas.  
      <p className="text-sm text-gray-700 mt-2">
        Revisa la consola para más detalles.
      </p>
    </div>
  );
}

// 🚀 Render de la app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<ErrorBoundary />} />
    </AuthProvider>
    </CartProvider>
  </React.StrictMode>
);
