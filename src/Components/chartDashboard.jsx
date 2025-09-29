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
import { db } from "../Firebase/congif";

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
  const countsUsers=(roleCounts.admin || 0) +
  (roleCounts.moderator || 0) +
  (roleCounts.user || 0);

  const [activeChart, setActiveChart] = useState("usuarios"); // gráfico visible por defecto

 
  // 🔹 Cargar usuarios desde Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const data = snapshot.docs.map((doc) => doc.data());

        const counts = data.reduce(
          (acc, item) => {
            const role = item.rol ? item.rol.toLowerCase() : "user";
            acc[role] = (acc[role] || 0) + 1;
            return acc;
          },
          { admin: 0, moderator: 0, user: 0 }
        );

        setRoleCounts(counts);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  // 🔹 Redibujar gráfico al cambiar `activeChart`
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    let data, type, options;

    // Configuración según gráfico activo
    if (activeChart === "usuarios") {
      type = "bar";
      data = {
        labels: ["Admin", "Moderator", "User"],
        datasets: [
          {
            label: "Roles",
            data: [
              roleCounts.admin || 0,
              roleCounts.moderator || 0,
              roleCounts.user || 0,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(75, 192, 192, 0.6)",
            ],
          },
        ],
      };
      options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Distribución de Roles",
            font: { size: 20, weight: "bold" },
            color: "#0f5167",
          },
          subtitle: {
            display: true,
            text: "Cantidad de usuarios por rol",
            color: "#414652",
          },
          datalabels: {
            anchor: "end",
            align: "end",
            color: "#5a1313",
            font: { weight: "bold" },
            formatter: (value) => value,
          },
        },
        scales: { y: { beginAtZero: true } },
      };
    }

    if (activeChart === "mensajes") {
      type = "bar";
      data = {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
        datasets: [
          {
            label: "Mensajes",
            data: [20, 40, 50, 70, 60, 90],
            borderColor: "#089bcdff",
            backgroundColor: ["#0d7a1433","#1099c7ff","#b1eb32ff","#520c5bff","#0a0f95ff","#2f670fff"],
            color:'#fff',
            fill: true,
            tension: 0.4,
          },
        ],
      };
      options = {
        responsive: true,
        plugins: {
          title: { display: true, text: "Mensajes Totales", color: "#0f5167" },
             datalabels: {
            anchor: "center",
            align: "center",
            color: "#fff",
            font: { weight: "bold" },
            formatter: (value) => value,
          },
        },
      };
    }

    if (activeChart === "inventario") {
      type = "bar";
      data = {
        labels: ["Disponibles", "Agotados", "En tránsito"],
        datasets: [
          {
            data: [120, 40, 30],
            backgroundColor: ["#4CAF50", "#F44336", "#FF9800"],
          },
        ],
      };
      options = {
        responsive: true,
        plugins: {
          title: { display: true, text: "Inventario", color: "#0f5167" },
        },
      };
    }

    if (activeChart === "facturacion") {
      type = "line";
      data = {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
        datasets: [
          {
            label: "Facturación",
            data: [500, 800, 600, 900, 750, 950],
            backgroundColor: "rgba(21,101,192,0.2)",
            borderColor: "#1565C0",
          },
        ],
      };
      options = {
        responsive: true,
        plugins: {
          title: { display: true, text: "Facturación Mensual", color: "#0f5167" },
        },
      };
    }

    chartRef.current = new ChartJS(ctx, { type, data, options });
  }, [activeChart, roleCounts]);


  return (
    <>
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-[#0f5167] mb-2">
        Visualiza el Rendimiento
      </h2>
      <p className="text-md text-[#414652] max-w-xl mx-auto">
        Visualiza de un vistazo el rendimiento de tu negocio con métricas en tiempo real, gráficos dinámicos y fáciles de interpretar, e información centralizada para una mejor toma de decisiones.
      </p>
    </div>
    <div className="px-4 py-2">
      <div className="p-4 grid md:grid-cols-1 gap-6">
        <div className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          <button className="rounded-lg !p-0 !bg-white border text-card-foreground shadow-sm group hover:shadow-lg transition-smooth hover:scale-105 border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in pointer"  
          onClick={() => setActiveChart("usuarios")} >
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-black font-sm  text-left text-[.875rem] leading-[1.5rem]" >Ingresos Totales</h3>
              <div className="p-[0.5rem] rounded-lg !bg-linear-to-r !from-[#1498ccff] !to-[#0d5b8cff]  text-primary-foreground text-g size-[2.5rem]" >
                <i class="fa-solid fa-users text-[1.2rem]"></i>
              </div>
            </div>
            <div className="p-6 pt-0 ">
                <h6 className="text-2xl font-bold text-black  animate-counter text-left  leading-[1.25rem]" >{countsUsers}</h6>
                <p className="text-xs text-green-500 flex items-end mt-1 opacity-[0.7] gap-1 "><i class="fa-solid fa-arrow-trend-up"></i> Total de usuarios</p>
            </div>
          </button>
           <button onClick={() => setActiveChart("mensajes")} className="rounded-lg !p-0 !bg-white border text-card-foreground shadow-sm group hover:shadow-lg transition-smooth hover:scale-105 border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in pointer"  
          >
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-black font-sm  text-left text-[.875rem] leading-[1.5rem]" >Mensajes Totales</h3>
              <div className="p-[0.5rem] rounded-lg !bg-linear-to-r !from-[#1498ccff] !to-[#0d5b8cff]  text-primary-foreground text-g size-[2.5rem]" >
                <i class="fa-solid fa-message text-[1.5rem]"></i>
              </div>
            </div>
            <div className="p-6 pt-0 ">
                <h6 className="text-2xl font-bold text-black  animate-counter text-left  leading-[1.25rem]" >{countsUsers}</h6>
                <p className="text-xs text-green-500 flex items-end mt-1 opacity-[0.7] gap-1 "><i class="fa-solid fa-arrow-trend-up"></i> Total de Mensajes</p>
            </div>
          </button>
           <button onClick={() => setActiveChart("inventario")} className="rounded-lg !p-0 !bg-white border text-card-foreground shadow-sm group hover:shadow-lg transition-smooth hover:scale-105 border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in pointer"  
          >
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-black font-sm  text-left text-[.875rem] leading-[1.5rem]" >Inventario Totales</h3>
              <div className="p-[0.5rem] rounded-lg !bg-linear-to-r !from-[#1498ccff] !to-[#0d5b8cff]  text-primary-foreground text-g size-[2.5rem]" >
                <i class="fa-solid fa-warehouse text-[1.2rem]"></i>
              </div>
            </div>
            <div className="p-6 pt-0 ">
                <h6 className="text-2xl font-bold text-black  animate-counter text-left  leading-[1.25rem]" >{countsUsers}</h6>
                <p className="text-xs text-green-500 flex items-end mt-1 opacity-[0.7] gap-1 "><i class="fa-solid fa-arrow-trend-up"></i> Total de Products</p>
            </div>
          </button>
            <button className="rounded-lg !p-0 !bg-white border text-card-foreground shadow-sm group hover:shadow-lg transition-smooth hover:scale-105 border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in pointer"  
         onClick={() => setActiveChart("facturacion")}  >
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-black font-sm  text-left text-[.875rem] leading-[1.25rem]" >Facturacion Totales</h3>
              <div className="p-[0.5rem] rounded-lg !bg-linear-to-r !from-[#1498ccff] !to-[#0d5b8cff]  text-primary-foreground text-g size-[2.5rem]" >
                <i class="fas fa-file-invoice text-[1.5rem]"></i>
              </div>
            </div>
            <div className="p-6 pt-0 ">
                <h6 className="text-2xl font-bold text-black  animate-counter text-left  leading-[1.25rem]" >{countsUsers}</h6>
                <p className="text-xs text-green-500 flex items-end mt-1 opacity-[0.7] gap-1 "><i class="fa-solid fa-arrow-trend-up"></i> Total de Products</p>
            </div>
          </button>
        </div>
          {/* Gráfico dinámico de roles */}
        <div className="md:flex items-start gap-6 h-max">    
          <div className="rounded-lg bg-white shadow p-4 mb-4 md:mb-0 md:w-[95%] w-full h-full" >
            <div  className=" block my-[1rem] md:h-[28rem] h-max-[28rem] h-auto">
                <canvas ref={canvasRef}></canvas>
            </div>
          </div>
          <div className="space-y-6 md:w-[30%] w-full">
            <div className="rounded-lg bg-white shadow  " >
              <div id="" className="space-y-6">
                <div className="flex space-y-1.5 p-6 items-center !mb-0 gap-2 justify-center md:justify-left">
                  <i class="fa-solid fa-clock-rotate-left text-[2rem] text-[#0b80af]"></i>
                  <h4 className="text-[#0f5167] font-bold ">Actividades recientes</h4>
                </div>
                <div className="p-6 pt-0 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 justify-center md:justify-left "> 
                      <i class="fa-regular fa-circle-check text-green-500 animate-pulse "></i>
                      <div className="block leading-0">
                        <p className="text-sm font-medium text-black">Nueva venta - $2,450</p>
                        <span className="text-xs text-[#6c727f]">Hace 2 minutos</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 justify-center md:justify-left"> 
                      <i class="fa-regular fa-circle-check text-green-500 animate-pulse "></i>
                      <div className="block leading-0">
                        <p className="text-sm font-medium text-black">Nueva venta - $2,450</p>
                        <span className="text-xs text-[#6c727f]">Hace 2 minutos</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 justify-center md:justify-left "> 
                      <i class="fa-regular fa-circle-check text-green-500 animate-pulse "></i>
                      <div className="block leading-0">
                        <p className="text-sm font-medium text-black">Nueva venta - $2,450</p>
                        <span className="text-xs text-[#6c727f]">Hace 2 minutos</span>
                    </div>
                  </li>
                  </ul>
                </div>
              </div>
            </div>
              <div className="rounded-lg bg-white shadow  " >
              <div id="" className="space-y-6">
                <div className="flex space-y-1.5 p-6 items-center !mb-0 gap-2">
                  <i class="fa-solid fa-download text-[2rem] text-[#0b80af]"></i>
                  <h4 className="text-[#0f5167] font-bold ">Descargar reportes</h4>
                </div>
                <div className="p-6 pt-0 space-y-4">
                  <ul className="space-y-3 divide-y-4 divide-gray-300">
                    <li className=" mb-0  py-[0.2rem]"> 
                       <a href="" className="flex items-center gap-2 !p-0">
                      <i class="fa-solid fa-file-pdf text-red-500 animate-pulse text-[1.2rem]"></i>
                      <div className="block leading-0">
                       
                          <p className="text-sm font-medium text-black">reportes de mensajes</p>
                          <span className="text-xs text-[#6c727f]">Peso: 4MB</span>
                      </div>
                    </a>
                  </li>
                  <li className=" mb-0 py-[0.2rem]"> 
                       <a href="" className="flex items-center gap-2 !p-0 py-2">
                      <i class="fa-solid fa-file-pdf text-red-500 animate-pulse text-[1.2rem]"></i>
                      <div className="block leading-0">
                       
                          <p className="text-sm font-medium text-black">reportes de mensajes</p>
                          <span className="text-xs text-[#6c727f]">Peso: 4MB</span>
                      </div>
                    </a>
                  </li>
                  <li className=" mb-0  py-[0.2rem]"> 
                       <a href="" className="flex items-center gap-2 !p-0">
                      <i class="fa-solid fa-file-pdf text-red-500 animate-pulse text-[1.2rem]"></i>
                      <div className="block leading-0">
                       
                          <p className="text-sm font-medium text-black">reportes de mensajes</p>
                          <span className="text-xs text-[#6c727f]">Peso: 4MB</span>
                      </div>
                    </a>
                  </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      
      </div>
    </div>
    </>
  );
}
