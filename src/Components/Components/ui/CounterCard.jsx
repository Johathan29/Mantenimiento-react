import { useEffect,useState,useRef } from "react";
import inStock from "../../assets/en-stock.png";
export function CounterCard({ role = "slider", count }) {
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
      { threshold: 0.1 }
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
      }, 10);
    }
  }, [start, count]);


  // --------------------------------
  // 🔹 SI ES SLIDER → SOLO NÚMERO
  // --------------------------------
  if (role === "slider") {
    return (
      <div ref={ref} className="text-left  text-[2rem] text-sky-500">
        {current }
      </div>
    );
  }

  // --------------------------------
  // 🔹 SI NO ES SLIDER → TARJETA COMPLETA
  // --------------------------------
  return (
    <div
      ref={ref}
      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#f0f8ff]">
            <img src={inStock} alt="" className="w-12 h-12 rounded-lg" />
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
