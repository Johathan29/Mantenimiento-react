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
//import reciente from '../assets/factura.png'
import { Line, Doughnut } from "react-chartjs-2";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/congif";
import { productController } from "../../Controllers/productController";
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

export default function ChartProducts() {
  const [product, setProducts] = useState([])
  const [dataProducts,setProduct]=useState([])
  const {fetchproduct}=productController
  const chartRef = useRef(null);
  const canvasInven = useRef(null);
 
  // gráfico visible por defecto

 
  // 🔹 Cargar usuarios desde Firestore
  useEffect(() => {
    async function fetchData() {
      const data = await fetchproduct();
      setProducts(data);
      console.log(data)
 }
    fetchData();
   console.log(product)
  }, []);
  useEffect(()=>{
    async function fetchData() {
      const data = await fetchproduct();
      setProduct(data);
      
    }
    fetchData();
  }
  ,[])
  console.log(dataProducts)
  // 🔹 Redibujar gráfico al cambiar `activeChart`
  useEffect(() => {
    if (!canvasInven.current) return;
    const ctx = canvasInven.current.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    let data, type, options;
    

    
    console.log(data)
    // Configuración según gráfico activo
  
      type = "bar";
      data = {
        labels: ["Enero", "Febrero"],
        datasets: [
          {
            label: "Phone",
            data: [ 120,200
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              
            ],
          },
          {
            label: "TVs/Monitores",
            data: [ 300,100
            ],
            backgroundColor: [
              
              "rgba(54, 162, 235, 0.6)",
              
            ],
          },
          {
            label: "PC",
            data: [ 400,500
            ],
            backgroundColor: [
              
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
            anchor: "center",
            align: "center",
            color: "#5a1313",
            font: { weight: "bold" },
            formatter: (value) => value,
          },
        },
        scales: { y: { beginAtZero: true } },
      };
    

    
    chartRef.current = new ChartJS(ctx, { type, data, options });
  }, []);


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
    <div className="md:flex items-start gap-6 h-max">    
          <div className="rounded-lg bg-white shadow p-4 mb-4 md:mb-0 md:w-[95%] w-full h-full" >
            <div  className=" block my-[1rem] md:h-[28rem] h-max-[28rem] h-auto">
                <canvas ref={canvasInven}></canvas>
                
            </div>
          </div>
       
      
      </div>
    
    </>
  );
}
