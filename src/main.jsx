import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import "./index.css";

import { routes } from "./Routes/routes";

// 🔹 Componente que genera rutas dinámicamente
const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
