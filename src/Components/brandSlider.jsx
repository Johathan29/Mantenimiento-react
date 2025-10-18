import { motion } from 'framer-motion';
import apple from '../assets/Apple_logo_black.svg'
import Sony from '../assets/Sony_logo.svg'
import Dell from '../assets/Dell_Logo.svg'
import HP from '../assets/HP_logo_2012.svg'
import Lenovo from '../assets/Lenovo_logo_2015.svg'
import samsumg from '../assets/samsung-Logo.svg'
const brands = [
  { name: "Apple", src: apple },
  { name: "Samsung", src: samsumg },
  { name: "Sony", src:Sony },
  { name: "Dell", src: Dell },
  { name: "HP", src: HP },
  { name: "Lenovo", src: Lenovo },
];

const BrandsCarousel = () => {
  // Duplicamos las marcas para el efecto infinito
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-12 bg-muted/30 overflow-hidden p-2">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4  text-center ">
          <span className='!bg-gradient-to-r !from-[#24278f] !via-[#5c2eb8] !to-[#00bfff] !bg-clip-text text-transparent  '>
            Marcas Destacadas
          </span>
        </h2>
        <p className="!text-[1.125rem] leading-[1.75rem] text-muted-foreground max-w-xl mx-auto text-center">
          Trabajamos con las mejores marcas del mercado
        </p>
      </div>
      <div className='container mx-auto px-4'>
        <div className="relative w-full overflow-hidden py-4">
          <motion.div
            className="flex gap-16 items-center"
            animate={{
              x: [0, -100 * brands.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ width: 'max-content' }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex flex-col items-center justify-center min-w-[120px] group h-auto"
              >
                <div className="w-24 h-24 rounded-full bg-background p-4 buttonRef shadow-md flex items-center justify-center text-4xl group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                  <img src={brand.src} alt={brand.name} className=''/>
                </div>
                <span className="mt-3 text-sm font-semibold text-gray-500 group-hover:!text-sky-500 transition-colors">
                  {brand.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandsCarousel;