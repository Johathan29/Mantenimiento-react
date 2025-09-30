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
  SubTitle,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState, useRef } from "react";
import useControllerChild from "../Controllers/ControllerChild";
import PathLocation from "../Hooks/Location";
import TitlePage from "../Controllers/TitlePage";
import inStock from "../assets/en-stock.png";
import backgroundCard from '../assets/backgroundcard.png'
import { userController } from "../Controllers/controllerUser";

// Registrar ChartJS + plugin
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
  ChartDataLabels
);

// 🔹 Counter Card
function CounterCard({ role, count }) {
  const [start, setStart] = useState(false);
  const [current, setCurrent] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
  }, []);

  useEffect(() => {
    if (start) {
      let i = 0;
      const step = count / 100;
      const interval = setInterval(() => {
        i += step;
        if (i >= count) {
          setCurrent(count);
          clearInterval(interval);
        } else {
          setCurrent(Math.ceil(i));
        }
      }, 20);
    }
  }, [start, count]);

  return (
    <div
      ref={ref}
      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#f0f8ff]">
            <img
              src={inStock}
              alt=""
              className="w-12 h-12 rounded-lg flex items-center justify-center"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-[#21242c]">
              {role || "Gestión de Usuarios"}
            </h3>
            <p className="text-sm text-[#73888c]">Total de {role}</p>
          </div>
        </div>
        <div className="text-left mt-4 text-[2rem] font-bold text-[#00728f]">
          {current >= 100 ? current + "+" : current}
        </div>
      </div>
    </div>
  );
}

function Child() {
  const { fetchUsers, deleteUser } = userController;
  const [userLogin, setUserLogin] = useState([]);
  const [datacollection, setCollection] = useState([]);
  const [groupedByRol, setGroupedByRol] = useState([]);
  const [userCount, setUserCount] = useState(0);

  const path = PathLocation();
  TitlePage();

  // Traer datos de Firestore
  useEffect(() => {
    setUserLogin(JSON.parse(localStorage.getItem("user")));
    async function fetchData() {
      const data = await fetchUsers();
      setCollection(data);
      setGroupedByRol(groupByRol(data));
      setUserCount(data.length);
    }
    fetchData();
  }, []);

  // Agrupar por rol
  function groupByRol(data) {
    const grouped = {};
    for (const item of data) {
      if (!grouped[item.rol]) grouped[item.rol] = [];
      grouped[item.rol].push(item);
    }
    return Object.entries(grouped);
  }

  // 🔹 Gráficos (solo para our_collaborators)
  const chartRefs = useRef([]);
  const canvasRefs = useRef([]);

  useEffect(() => {
    if (path !== "/our_collaborators") return;

    const chartTypes = ["bar", "line", "doughnut", "pie"];
    const chartTitles = [
      "Distribución de Ventas por Meses",
      "Crecimiento de Clientes",
      "Productos en Stock",
      
    ];

    const chartDatasets = [
      {
        labels: ["Enero", "Febrero", "Marzo"],
        datasets: [
          {
            label: "Ventas",
            data: [10, 25, 15],
            backgroundColor: ["#f87171", "#60a5fa", "#34d399"],
          },
        ],
      },
      {
        labels: ["Ene", "Feb", "Mar", "Abr", "May"],
        datasets: [
          {
            label: "Usuarios",
            data: [5, 10, 8, 15, 12],
            borderColor: "#6366f1",
            backgroundColor: "rgba(99, 102, 241, 0.3)",
            fill: true,
          },
        ],
      },
      {
        labels: ["Electrónica", "Ropa", "Hogar", "Otros"],
        datasets: [
          {
            label: "Stock",
            data: [120, 80, 100, 60],
            backgroundColor: ["#fbbf24", "#10b981", "#3b82f6", "#ef4444"],
          },
        ],
      },
     
    ];

    chartRefs.current.forEach((chart) => chart?.destroy());

    chartRefs.current = chartTypes.map((type, i) => {
      const ctx = canvasRefs.current[i]?.getContext("2d");
      if (!ctx) return null;
      return new ChartJS(ctx, {
        type,
        data: chartDatasets[i],
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: chartTitles[i],
              font: { size: 25, weight: "bold" },
              color: "#0f5167",
              
            },
            subtitle: {
              display: true,
              text: "Datos en tiempo real",
              color: "#6b7280",
            },
            datalabels: {
              anchor: i===1?"end" : "center",
              align:  i===1?"end" : "center",
              color: i===1?"#636488":"#fff",
              font: { weight: "bold" },
            },
          },
          scales:
            type === "doughnut" || type === "pie"
              ? {}
              : {
                  y: { beginAtZero: true },
                },
        },
      });
    });
  }, [path]);

  return (
    <>
      <section
        className={
          path !== "/our_collaborators"
            ? "bg-white text-gray-400 p-[4rem] md:mt-[25rem] lg:mt-[40%] mt-[66%]"
            : "bg-white text-gray-400 p-[4rem]"
        }
        style={{
          backgroundImage: "url('"+backgroundCard+"')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          width: "100%",
          minHeight: "400px",
        }}
      >
        {/* Encabezado */}
        <div className="max-w-7xl mx-auto lg:pt-[4rem] md:pt-[4rem] pt-[6rem]">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f5167] mb-2">
              Visualiza el Rendimiento
            </h2>
            <p className="text-md text-[#414652] max-w-xl mx-auto">
              Visualiza de un vistazo el rendimiento de tu negocio con métricas
              en tiempo real, gráficos dinámicos y fáciles de interpretar.
            </p>
          </div>

          {/* Contadores */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <CounterCard role="Ventas" count={userCount} />
            <CounterCard role="Clientes" count={userCount + 5} />
            <CounterCard role="Productos" count={userCount - 2} />
            
            <CounterCard role="Categorias" count={userCount + 10} />
          </div>
        </div>

        {/* Gráficos (solo en /our_collaborators) */}
        {path === "/our_collaborators" && (
          <div className="max-w-7xl mx-auto py-[2rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md p-4 flex items-center justify-center"
                >
                  <canvas ref={(el) => (canvasRefs.current[i] = el)} />
                </div>
              ))}
              <div class=" bg-linear-to-r from-cyan-500 to-blue-500 rounded-xl shadow-md p-8 items-center spaces-x-4 justify-center" style={{boxShadow: "#1d6f9d 0px 5px 15px;"}}>

<h3 class="text-[#fff] text-[28px] text-center mb-[1.5rem] border-b-[3px] border-[#fff] font-bold">Testimonios de Clientes
</h3>
<div class="grid mb-8   md:mb-12 md:grid-cols-1 gap-[1rem] ">
    <figure class="flex flex-col items-center rounded-lg justify-start p-4 text-center border-[#fff] border bg-white">
        <blockquote class="mb-4 text-gray-900 lg:mb-4 ">
            <h3 class="text-lg font-semibold text-gray-900 ">Very easy this was to integrate</h3>
            <p class="my-4">If you care for your time, I hands down would go with this."</p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture"/>
            <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3 leading-[0.5]">
                <div class="text-[#3c82f6] text-[17px] font-bold">Bonnie Green</div>
                <div class="text-sm text-gray-800 ">Developer at Open AI</div>
            </div>
        </figcaption>    
    </figure>
    
    <figure class="flex flex-col items-center rounded-lg justify-start p-4 text-center border-[#fff] border bg-white">
        <blockquote class="mb-4 text-gray-900 lg:mb-4 ">
            <h3 class="text-lg font-semibold text-gray-900 ">Very easy this was to integrate</h3>
            <p class="my-4">If you care for your time, I hands down would go with this."</p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture"/>
            <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3 leading-[0.5]">
                <div class="text-[#3c82f6] text-[17px] font-bold">Bonnie Green</div>
                <div class="text-sm text-gray-800 ">Developer at Open AI</div>
            </div>
        </figcaption>    
    </figure>
    <figure class="flex flex-col items-center rounded-lg justify-start p-4 text-center border-[#fff] border bg-white">
        <blockquote class="mb-4 text-gray-900 lg:mb-4 ">
            <h3 class="text-lg font-semibold text-gray-900 ">Very easy this was to integrate</h3>
            <p class="my-4">If you care for your time, I hands down would go with this."</p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture"/>
            <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3 leading-[0.5]">
                <div class="text-[#3c82f6] text-[17px] font-bold">Bonnie Green</div>
                <div class="text-sm text-gray-800 ">Developer at Open AI</div>
            </div>
        </figcaption>    
    </figure>
    
    
</div>
<div className="w-full flex justify-end">
<Link class="buttonRef2 liquid !text-white rounded-md border-1 !p-[0.5rem] flex items-center justify-between md:w-[7rem] lg:!w-[7rem] w-full text-[19px] hover:!text-blue-400 hover:bg-white " to={'/testimonio'}>Ver mas <i class="fa-solid fa-arrow-right"></i></Link>
</div>
</div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Child;
