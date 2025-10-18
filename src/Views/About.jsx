// src/pages/About.jsx
import { motion } from "framer-motion";
import aboutImg from "../assets/imgAbout.jpeg"
export default function About() {
     const timeline = [
    {
      year: "2018",
      title: "El Comienzo",
      description: "Iniciamos como una pequeña tienda online con 50 productos.",
      direction: "right",
    },
    {
      year: "2019",
      title: "Expansión",
      description: "Alcanzamos 500 productos y abrimos nuestro primer almacén.",
      direction: "left",
    },
    {
      year: "2021",
      title: "Crecimiento",
      description: "Llegamos a 10,000 clientes satisfechos y expandimos a nuevas categorías.",
      direction: "right",
    },
    {
      year: "2023",
      title: "Reconocimiento",
      description: "Premio a la mejor tienda online de tecnología del año.",
      direction: "left",
    },
    {
      year: "2025",
      title: "Innovación",
      description: "Implementamos IA para personalizar la experiencia de compra.",
      direction: "right",
    },
  ];
    const fadeInVariants = (direction) => ({
    hidden: { opacity: 0, x: direction === "left" ? -50 : 50 },
    visible: { opacity: 1, x: 0 },
  });

  return (
    <section className="relative overflow-hidden !text-gray-100 py-24">
      {/* Gradiente decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.25),_transparent_60%)]" />

      <div className="relative container mx-auto px-6 md:px-12 lg:px-20 text-center">
        <div className="flex items-center gap-4">        {/* Encabezado */}
            <div className="max-w-2xl mx-auto"><motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold mb-4 !bg-transparent "
            >
            <span className="!bg-gradient-to-r !from-[#24278f] !via-[#5c2eb8] !to-[#00bfff] !bg-clip-text text-transparent  ">About Our Tech Store</span>
            </motion.h1>

            <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg text-gray-500 mb-12"
            >
            We are passionate about bringing you the latest and most reliable
            technology products. From laptops and accessories to cutting-edge
            gadgets, our mission is to empower your digital lifestyle.
            </motion.p>
            </div>
            <div className="relative">
                <img className="rounded-2xl shadow-2xl w-full h-[400px] object-cover" src={aboutImg}/> 
                <div className="absolute -bottom-6 -left-6 bg-white  p-6 rounded-xl shadow-xl">
                 <p className="text-4xl font-bold text-[#24278f] block w-[8rem]">7<sup>+</sup></p>
                 <span className="text-sm text-gray-400 font-semibold">años de experiencia</span>
                </div>  
            </div>     
        </div>
        {/* Tarjetas de valores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-24">
          {[
            {
              title: "Innovation",
              icon: "fa-solid fa-lightbulb",
              desc: "We stay ahead of trends, offering the newest products and solutions for tech enthusiasts.",
            },
            {
              title: "Quality",
              icon: "fa-solid fa-star",
              desc: "Every item in our catalog is carefully selected for performance, reliability, and durability.",
            },
            {
              title: "Customer Care",
              icon: "fa-solid fa-handshake",
              desc: "We provide fast support, transparent policies, and a seamless shopping experience.",
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white/10 backdrop-blur-md !border-2 !border-gray-300/10 shadow-xl hover:shadow-cyan-400/30 hover:scale-105 transition-transform duration-300"
            >
              <i
                className={`${card.icon} text-4xl text-cyan-400 mb-4 drop-shadow-md`}
              ></i>
              <h3 className="text-2xl font-semibold mb-2 !text-cyan-400">
                {card.title}
              </h3>
              <p className="!text-gray-400">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4">
      {/* Título principal */}
      <motion.div
        className="text-center mb-12 py-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          <span
            className="!bg-gradient-to-r from-[hsl(238,60%,35%)] via-[hsl(260,60%,45%)] to-[hsl(195,100%,50%)] 
            bg-clip-text text-transparent"
          >
            Nuestra Historia
          </span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Un viaje de evolución constante e innovación
        </p>
      </motion.div>

      {/* Línea del tiempo */}
      <div className="max-w-4xl mx-auto">
        {timeline.map((item, index) => (
          <motion.div
            key={item.year}
            className="relative pl-8 pb-12 border-l-2 border-primary/30 last:pb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants(item.direction)}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Punto con gradiente */}
            <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full 
              bg-gradient-to-br from-[hsl(238,60%,35%)] to-[hsl(195,100%,50%)] shadow-glow" />

            {/* Tarjeta del año */}
            <div className="bg-card p-6 rounded-xl shadow-lg border border-border ml-4">
              <span className="inline-block px-3 py-1 bg-gradient-to-br from-[hsl(238,60%,35%)] to-[hsl(195,100%,50%)]   text-white rounded-full border-1 text-sm font-semibold mb-2">
                {item.year}
              </span>
              <h3 className="text-xl font-bold mb-2 text-sky-600">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
      <motion.div
      className="bg-hero-gradient max-w-7xl mx-auto my-12
                 rounded-2xl p-12 text-center text-white shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        ¿Listo para explorar?
      </h2>

      <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
        Descubre nuestra amplia selección de productos tecnológicos y únete a
        miles de clientes satisfechos
      </p>

      <a href="/products"
        className="px-8 py-3 bg-white text-[hsl(238,60%,35%)] rounded-lg font-semibold z-50 relative
                   hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:scale-105 !cursor-pointer"
      >
        Ver Productos
      </a>
    </motion.div>
    </section>
  );
}
