import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Tv,
 
  Computer,
  Laptop2
} from "lucide-react";

export default function BrandsCarousel() {
  const api = import.meta.env.VITE_API_BASE_URL;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // ← Aquí guardaremos las categorías dinámicas

  // Función para asignar iconos según el nombre de categoría
  const iconMap = {
    Smartphones: Smartphone,
    Computer: Laptop2,
    Audio: Headphones,
    Wearables: Watch,
    PC:Computer,
    TV: Tv,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${api}/api/products`);
        const data = res.data;

        setProducts(data);

        // Extraemos categorías únicas y les aplicamos un icono
        const uniqueCategories = [
          ...new Set(data.map((p) => p.Category)),
        ].map((cat) => ({
          name: cat,
          icon: iconMap[cat] || Smartphone , // default si no coincide
          color: "text-white",
        }));

        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [api]);

  const onSelectCategory = (category) => {
    console.log("Categoría seleccionada:", category);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto py-12">
        <div class="text-center  py-2 ">
          <h2 class="text-4xl md:text-5xl font-bold ">
            <span class="!bg-gradient-to-r !from-[#24278f] !via-[#5c2eb8] !to-[#00bfff] !bg-clip-text text-transparent  ">
               Explora por Categoría
            </span>
          </h2>
          <span className="text-sm text-[#4b5563] font-[600]">
          Navega entre nuestras categorías y encuentra la tecnología perfecta para tu estilo de vida
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
          {categories.map((cat, i) => {
            const Icon = cat.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onSelectCategory(cat.name)}
                className="cursor-pointer"
              >
                <div className="rounded-lg border bg-white shadow-sm hover:shadow-xl transition-all group">
                  <div className="p-6 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-hero-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className={`h-8 w-8 ${cat.color}`} />
                    </div>

                    <h3 className="text-md font-bold text-center text-sky-500">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
