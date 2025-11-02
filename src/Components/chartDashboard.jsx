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
  const [roleCounts, setRoleCounts] = useState({ admin: 0, moderator: 0, user: 0 });
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const countsUsers = (roleCounts.admin || 0) + (roleCounts.moderator || 0) + (roleCounts.user || 0);
  const [activeChart, setActiveChart] = useState("usuarios");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const data = snapshot.docs.map(doc => doc.data());
        const counts = data.reduce((acc, item) => {
          const role = item.rol ? item.rol.toLowerCase() : "user";
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, { admin: 0, moderator: 0, user: 0 });
        setRoleCounts(counts);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    if (chartRef.current) chartRef.current.destroy();

    let type, data, options;
    switch (activeChart) {
      case "usuarios":
        type = "bar";
        data = {
          labels: ["Admin", "Moderator", "User"],
          datasets: [{
            label: "Roles",
            data: [roleCounts.admin, roleCounts.moderator, roleCounts.user],
            backgroundColor: ["#f87171", "#3b82f6", "#34d399"]
          }]
        };
        options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: "Distribución de Roles", color: "#fff", font: { size: 16, weight: "bold" } },
            datalabels: { anchor: "end", align: "end", color: "#fff" }
          },
          scales: { y: { beginAtZero: true, ticks: { color: "#ccc" } }, x: { ticks: { color: "#ccc" } } }
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
      case "inventario":
        type = "bar";
        data = { labels: ["Disponibles", "Agotados", "En tránsito"], datasets: [{ data: [120, 40, 30], backgroundColor: ["#4CAF50", "#F44336", "#FF9800"] }] };
        options = { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: "Inventario", color: "#fff" },  datalabels: { anchor: "center", align: "center", color: "#fff" } } };
        break;
      case "facturacion":
        type = "line";
        data = { labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"], datasets: [{ label: "Facturación", data: [500, 800, 600, 900, 750, 950], backgroundColor: "rgba(21,101,192,0.2)", borderColor: "#1565C0", tension: 0.4 }] };
        options = { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: "Facturación Mensual", color: "#fff" }, datalabels: { anchor: "center", align: "center", color: "#fff" } } };
        break;
      default:
        return;
    }

    chartRef.current = new ChartJS(ctx, { type, data, options });
    return () => chartRef.current?.destroy();
  }, [activeChart, roleCounts]);

  const cards = [
    { id: "usuarios", title: "Usuarios Totales", icon: "fa-users", total: countsUsers, label: "Usuarios activos" },
    { id: "mensajes", title: "Mensajes Totales", icon: "fa-message", total: 2450, label: "Mensajes enviados" },
    { id: "inventario", title: "Inventario Total", icon: "fa-warehouse", total: 190, label: "Productos registrados" },
    { id: "facturacion", title: "Facturación Total", icon: "fa-file-invoice", total: 8750, label: "Facturación mensual" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0f5167] mb-2">Visualiza el Rendimiento</h2>
        <p className="text-md text-[#414652] max-w-xl mx-auto">Visualiza de un vistazo el rendimiento de tu negocio con métricas en tiempo real, gráficos dinámicos y fáciles de interpretar, e información centralizada para una mejor toma de decisiones.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map(card => (
          <button key={card.id} onClick={() => setActiveChart(card.id)}
            className={`rounded-xl bg-gradient-to-br from-[#0a1c3e] to-[#0b244d] border border-white/10 p-4 shadow-md  hover:shadow-md hover:shadow-white/40  transition-transform hover:scale-105 ${activeChart === card.id ? " hover:shadow-md shadow-white/40 " : ""}`}>
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
          {/* Actividades recientes */}
          <div className="rounded-lg bg-gradient-to-br from-[#0a1c3e] to-[#0b244d] border border-white/10 p-4 shadow-md  shadow-white/40 p-4">
            <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
              <i className="fa-solid fa-clock-rotate-left text-2xl text-white"></i>
              <h4 className="text-white font-bold">Actividades recientes</h4>
            </div>
            <ul className="space-y-3">
              {Array(3).fill("").map((_, idx) => (
                <li key={idx} className="flex items-center gap-2 justify-center lg:justify-start">
                  <i className="fa-regular fa-circle-check text-cyan-400 animate-pulse"></i>
                  <div className="leading-0">
                    <p className="text-sm font-medium text-cyan-400 ">Nueva venta - $2,450</p>
                    <span className="text-xs text-white/40">Hace 2 minutos</span>
                  </div>
                </li>
              ))}
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
