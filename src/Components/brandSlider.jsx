import { motion } from "framer-motion";
import apple from "../assets/Apple_logo_black.svg";
import Sony from "../assets/Sony_logo.svg";
import Dell from "../assets/Dell_Logo.svg";
import HP from "../assets/HP_logo_2012.svg";
import Lenovo from "../assets/Lenovo_logo_2015.svg";
import samsung from "../assets/samsung-Logo.jpg";

const brands = [
  { name: "Apple", src: apple },
  { name: "Samsung", src: samsung },
  { name: "Sony", src: Sony },
  { name: "Dell", src: Dell },
  { name: "HP", src: HP },
  { name: "Lenovo", src: Lenovo },
];

const BrandsCarousel = () => {
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-12 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="!bg-gradient-to-r !from-[#24278f] !via-[#5c2eb8] !to-[#00bfff] !bg-clip-text text-transparent">
            Marcas Destacadas
          </span>
        </h2>
        <p className="!text-[1.125rem] leading-[1.75rem] text-muted-foreground max-w-xl mx-auto text-center">
          Trabajamos con las mejores marcas del mercado
        </p>
      </div>

      {/* Carrusel */}
      <div className="relative w-full overflow-hidden py-6">
        <motion.div
          className="flex items-center"
          animate={{
            x: [0, -150 * brands.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          style={{ width: "max-content" }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 group"
            >
              <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full bg-background p-3 sm:p-4 shadow-md flex items-center justify-center text-4xl group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <span className="mt-3 text-sm font-semibold text-gray-500 group-hover:!text-sky-500 transition-colors text-center">
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsCarousel;

