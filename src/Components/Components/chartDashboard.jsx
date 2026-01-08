import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  SubTitle
} from "chart.js";
import reciente from '../assets/factura.png'
import { Line, Doughnut } from "react-chartjs-2";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/congif.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Link } from "react-router-dom";
import axios from "axios";

ChartJS.register(
  Title,
  SubTitle,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartDataLabels // 👈 importante
);
const cards = [1, 2, 3];
const smallCards = [1, 2, 3, 4, 5, 6, 7, 8];

export default function ChartDashboard() {
  // ───────────────────────────────────────────────
  // 🔹 ESTADOS
  // ───────────────────────────────────────────────
  const [roleCounts, setRoleCounts] = useState({ admin: 0, moderator: 0, user: 0 });
  const [activeChart, setActiveChart] = useState("usuarios");
  const [dataProducts, setProducts] = useState([]);
  const [dataSales, setSales] = useState([]);
  const [totalFacturacion, setTotalFacturacion] = useState(0);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const api = import.meta.env.VITE_API_BASE_URL;

  const totalUsuarios = (roleCounts.admin || 0) + (roleCounts.moderator || 0) + (roleCounts.user || 0);
  const totalProductos = dataProducts?.data?.length || 0;

  // ───────────────────────────────────────────────
  // 🔹 HELPERS DE FORMATO
  // ───────────────────────────────────────────────
  const formatNumber = (num) => new Intl.NumberFormat("es-ES").format(num);
  const formatCurrency = (num) =>
    new Intl.NumberFormat("es-US", { style: "currency", currency: "USD" }).format(num);

  // ───────────────────────────────────────────────
  // 🔹 CARGA INICIAL DE PRODUCTOS Y USUARIOS
  // ───────────────────────────────────────────────
  useEffect(() => {
    axios.get(`${api}/api/products`).then(setProducts).catch(console.error);

    // Obtener usuarios desde Firebase
    getDocs(collection(db, "users"))
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const counts = data.reduce(
          (acc, user) => {
            const role = user.rol?.toLowerCase() || "user";
            acc[role] = (acc[role] || 0) + 1;
            return acc;
          },
          { admin: 0, moderator: 0, user: 0 }
        );
        setRoleCounts(counts);
      })
      .catch((err) => console.error("Error al cargar usuarios:", err));
  }, []);


  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    if (chartRef.current) chartRef.current.destroy();

    let type, data, options;
    switch (activeChart) {
       // 📊 Distribución de roles de usuario
      case "usuarios":
        type = "bar";
        data = {
          labels: ["Admin", "Moderator", "User"],
          datasets: [
            {
              label: "Roles",
              data: [roleCounts.admin, roleCounts.moderator, roleCounts.user],
              backgroundColor: ["#f87171", "#3b82f6", "#34d399"],
            },
          ],
        };
        options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: "Distribución de Roles", color: "#fff" },
            datalabels: { anchor: "end", align: "end", color: "#fff" },
          },
          scales: { x: { ticks: { color: "#ccc" } }, y: { ticks: { color: "#ccc" }, beginAtZero: true } },
        };
        break;

      case "mensajes":
        type = "bar";
        data = {
          labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
          datasets: [{ label: "Mensajes", data: [20, 40, 50, 70, 60, 90], backgroundColor: ["#0d7a1433","#1099c7ff","#b1eb32ff","#520c5bff","#0a0f95ff","#2f670fff"] }]
        };
        options = { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: "Mensajes Totales", color: "#fff" },  datalabels: { anchor: "center", align: "center", color: "#fff" } } };
        break;
     // 📦 Productos por categoría
   
      // 📦 Productos por categoría
      case "inventario":
        const productos = dataProducts?.data || [];
        const categoriasCount = {};

        productos.forEach((p) => {
          const cat = p.Category || "Sin categoría";
          categoriasCount[cat] = (categoriasCount[cat] || 0) + 1;
        });

        const categoriasLabels = Object.keys(categoriasCount);
        const categoriasValues = Object.values(categoriasCount);

        type = "bar";
        data = {
          labels: categoriasLabels,
          datasets: [
            {
              label: "Cantidad de productos",
              data: categoriasValues,
              backgroundColor: ["#60A5FA", "#34D399", "#FBBF24", "#A78BFA", "#FB923C"],
            },
          ],
        };
        options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: "Productos por Categoría", color: "#fff" },
            datalabels: { anchor: "end", align: "end", color: "#fff", font: { weight: "bold" } },
          },
          scales: { x: { ticks: { color: "#ccc" } }, y: { ticks: { color: "#ccc" }, beginAtZero: true } },
        };
        break;
        // 💰 Ventas y facturación por categoría
      case "facturacion":
        const productosF = dataProducts?.data || [];
        const ventas = dataSales?.data || [];

        // Mapa producto → categoría y precio
        const map = {};
        productosF.forEach((p) => {
          if (p.id) map[p.id] = { cat: p.Category || "Sin categoría", price: Number(p.Price) || 0 };
        });

        // Acumuladores
        const cantPorCat = {};
        const factPorCat = {};
        let totalFact = 0;

        ventas.forEach((v) =>
          v.productos?.forEach((item) => {
            const prod = map[item.id];
            if (prod) {
              const cat = prod.cat;
              const cant = Number(item.cantidad) || 0;
              const precio = Number(item.precio || prod.price);
              const total = cant * precio;
              cantPorCat[cat] = (cantPorCat[cat] || 0) + cant;
              factPorCat[cat] = (factPorCat[cat] || 0) + total;
              totalFact += total;
            }
          })
        );

        // Actualizar total facturación global
        setTotalFacturacion(totalFact);

        // Gráfico
        const labels = Object.keys(cantPorCat);
        const cantidades = Object.values(cantPorCat);
        const facturaciones = labels.map((c) => factPorCat[c] || 0);

        type = "bar";
        data = {
          labels,
          datasets: [
            { label: "Cantidad vendida (uds)", data: cantidades, backgroundColor: "#34997418", yAxisID: "y",borderColor:"#0b724cfb",borderWidth:1 },
            { label: "Facturación total ($)", data: facturaciones, backgroundColor: "#fbbe242a", yAxisID: "y1",borderColor:"#755609ff",borderWidth:1 },
          ],
        };
        options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: "Ventas y Facturación por Categoría", color: "#fff" },
            datalabels: {
              anchor: "end",
              align: "end",
              color: "#fff",
              formatter: (v, ctx) =>
                ctx.dataset.label.includes("Facturación") ? `$${v.toFixed(2)}` : `${v} uds`,
            },
            legend: { labels: { color: "#fff" } },
          },
          scales: {
            y: { beginAtZero: true, ticks: { color: "#ccc" }, title: { text: "Cantidad (uds)", display: true } },
            y1: {
              beginAtZero: true,
              position: "right",
              ticks: { color: "#ccc", callback: (v) => `$${v.toLocaleString()}` },
              grid: { drawOnChartArea: false },
              title: { text: "Facturación ($)", display: true },
            },
            x: { ticks: { color: "#ccc" } },
          },
        };
        break;
      default:
        return;
    }
    chartRef.current = new ChartJS(ctx, { type, data, options });
    return () => chartRef.current?.destroy();
  }, [activeChart, roleCounts,dataProducts, dataSales]);
console.log(activeChart)
  const cards = [
    { id: "usuarios", title: "Usuarios Totales", icon: "fa-users", total: totalUsuarios, label: "Usuarios activos" },
    { id: "mensajes", title: "Mensajes Totales", icon: "fa-message", total: 2450, label: "Mensajes enviados" },
    { id: "inventario", title: "Inventario Total", icon: "fa-warehouse", total: formatNumber(totalProductos), label: "Productos registrados" },
    { id: "facturacion", title: "Facturación Total", icon: "fa-file-invoice", total: formatCurrency(totalFacturacion), label: "Facturación mensual" }
  ];
// 🔹 Estado para las actividades recientes
const [recentActivities, setRecentActivities] = useState([]);

// 🔹 Función para cargar actividades
const loadRecentActivities = async () => {
  try {
    // Obtener últimas ventas
    const salesRes = await axios.get(`${api}/api/sales`);
    const salesData = salesRes.data || [];

    // Obtener últimos productos
    const productsRes = await axios.get(`${api}/api/products`);
    const productsData = productsRes.data || [];

    // 🔹 Tomar las 3 ventas más recientes
    const lastSales = salesData
      .map((s) => ({
        type: "venta",
        title:
          s.productos && s.productos.length > 0
            ? `Nueva venta: ${s.productos.map((i) => i.nombre).slice(0, 2).join(", ")}${
                s.productos.length > 2 ? "..." : ""
              }`
            : "Nueva venta",
        price: Number(s.total || 0),
        date: s.date || s.createdAt || new Date(),
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    // 🔹 Tomar los 2 productos más recientes
    const lastProducts = productsData
      .map((p) => ({
        type: "producto",
        title: `Nuevo producto agregado: ${p.Name || p.name}`,
        price: Number(p.Price || 0),
        date: p.date || p.createdAt || new Date(),
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 2);

    // 🔹 Combinar ambas listas y ordenar por fecha (desc)
    const combined = [...lastSales, ...lastProducts].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setRecentActivities(combined);
  } catch (error) {
    console.error("Error cargando actividades recientes:", error);
  }
};

// 🔹 useEffect para cargar y refrescar cada 20 minutos
useEffect(() => {
  loadRecentActivities(); // primera carga
  const interval = setInterval(loadRecentActivities, 20 * 60 * 1000); // cada 20 minutos
  return () => clearInterval(interval);
}, []);


console.log(recentActivities)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0f5167] mb-2">Visualiza el Rendimiento</h2>
        <p className="text-md text-[#414652] max-w-xl mx-auto">Visualiza de un vistazo el rendimiento de tu negocio con métricas en tiempo real, gráficos dinámicos y fáciles de interpretar, e información centralizada para una mejor toma de decisiones.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map(card => (
          <button key={card.id} onClick={async () => {
              setActiveChart(card.id);
              if (card.id === "inventario") {
                try {
                  
                  const response = await axios.get(`${api}/api/products`);
                  setProducts(response);
                } catch (error) {
                  console.error("Error al actualizar productos:", error);
                }
              }else
                if (card.id === "facturacion") {
                try {
                  const response = await axios.get(`${api}/api/sales`);
                  setSales(response);
                } catch (error) {
                  console.error("Error al actualizar productos:", error);
                }
              }
            }}
            className={`rounded-xl bg-gradient-to-br from-[#0a1c3e] to-[#0b244d] border border-white/10 p-4 shadow-md  hover:shadow-md hover:shadow-white/40  transition-transform ${activeChart === card.id ? " hover:shadow-md shadow-white/40 " : ""}`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm text-gray-300 font-semibold">{card.title}</h3>
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                <i className={`fa-solid ${card.icon} text-lg`}></i>
              </div>
            </div>
            <h6 className="text-2xl font-bold text-white">{card.total}</h6>
            <p className="text-xs text-cyan-400 mt-1 flex items-center gap-1 opacity-80"><i className="fa-solid fa-arrow-trend-up"></i> {card.label}</p>
          </button>
        ))}
      </div>

      {/* Chart + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-[#0b1a35] rounded-xl p-4 flex-1 border border-white/10 shadow-inner min-h-[360px] lg:min-h-[420px]">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>

        <div className="flex flex-col gap-6 lg:w-1/3 w-full">
        {/* 🔹 Actividades recientes */}
<div className="rounded-lg bg-gradient-to-br from-[#0a1c3e] to-[#0b244d] border border-white/10 p-4 shadow-md shadow-white/40">
  <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
    <i className="fa-solid fa-clock-rotate-left text-2xl text-white"></i>
    <h4 className="text-white font-bold">Actividades recientes</h4>
  </div>
  <ul className="space-y-3">
    {recentActivities.length > 0 ? (
      recentActivities.map((a, idx) => (
        <li key={idx} className="flex items-center gap-2 justify-center lg:justify-start">
          <i
            className={`fa-solid ${
              a.type === "venta" ? "fa-shop text-green-400" : "fa-warehouse text-blue-400"
            } animate-pulse`}
          ></i>
          <div className="leading-0">
            <p className="text-sm font-medium text-cyan-400">{a.title}</p>
            <div className="flex justify-between items-center w-full gap-4">
              {a.type === "venta" && (
                <span className="text-xs text-white/40">
                  Precio: {formatCurrency(a.price)}
                </span>
              )}
              <span className="text-xs text-white/40">
                Fecha:{" "}
                {new Date(a.date).toLocaleString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "short",
                })}
              </span>
            </div>
          </div>
        </li>
      ))
    ) : (
      <p className="text-center text-white/50 text-sm">Cargando actividades...</p>
    )}
  </ul>
</div>

          {/* Descargar reportes */}
          <div className="rounded-lg bg-gradient-to-br from-[#0a1c3e] to-[#0b244d] border border-white/10 p-4 shadow-md  shadow-white/40 p-">
            <div className="flex items-center gap-3 mb-4">
              <i className="fa-solid fa-download text-2xl text-white"></i>
              <h4 className="text-white font-bold">Descargar reportes</h4>
            </div>
            <ul className="space-y-3 divide-y divide-gray-300">
              {Array(3).fill("").map((_, idx) => (
                <li key={idx} className="py-1 ">
                  <Link className="group flex items-center gap-2"
                  >
                    <i className="fa-solid fa-file-pdf text-red-500 animate-pulse text-[1.2rem]"></i>
                    <div>
                      <p className="text-sm font-medium text-cyan-400 group-hover:text-[#22d3ee]/40">Reportes de mensajes</p>
                      <span className="text-xs text-white/40">Peso: 4MB</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
