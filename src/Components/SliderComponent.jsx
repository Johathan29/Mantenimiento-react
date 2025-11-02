import hero from '../assets/hero.jpeg'
import ChartDashboard from './chartDashboard'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollButton from './ScrollButton';
export default function SliderShow(){
   const sectionRef = useRef(null);

  // Función que realiza el scroll
  const handleScroll = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
    return(
    <>
    <section className="relative overflow-hidden bg-hero-gradient py-20 md:py-32 w-full">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
            >
              <Zap className="h-4 w-4 text-sky-500" />
              <span className="text-sm font-medium">Nuevos productos</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="!text-4xl md:!text-6xl font-bold leading-tight text-white !bg-transparent"
            >
              La última tecnología
              <span className="block text-sky-500">a tu alcance</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/90"
            >
              Descubre los productos más innovadores con las mejores ofertas del mercado.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/productos" className='buttonRef !font-[600] rounded-xl flex items-center justify-between !px-[1.2em] !py-[0.6em] z-20 hover:!text-white group'>
                
                  Ver productos
                  <i class="fa-solid fa-arrow-right group-hover:translate-x-2 "></i>
                
               
              </Link>
              <Link to="/productos" className='border-white liquid text-white hover:bg-white/10 backdrop-blur-sm font-semibold buttonRef2 rounded-xl flex items-center justify-between !px-[1.2em] !py-[0.6em] z-20 '>
                
                  Ofertas del día
                
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 pt-8"
            >
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-white/80 text-sm">Productos</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-white/80 text-sm">Clientes</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.8★</div>
                <div className="text-white/80 text-sm">Valoración</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl flex items-center justify-center border border-white/20"
              >
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Producto Destacado
                  </h3>
                  <p className="text-white/80">
                    Lo mejor en tecnología
                  </p>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -left-4 w-24 h-24 bg-accent/30 rounded-2xl backdrop-blur-sm bg-[url('/src/assets/auricular.jpeg')] bg-cover bg-no-repeat"
              />
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 h-[8rem] -right-4 w-32 h-32 bg-white/20 rounded-2xl backdrop-blur-sm bg-[url('/src/assets/celular.jpg')] bg-cover bg-no-repeat bg-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
    </section>
    </>)
}