export default function WhyChooseUs (){
    return(
        <>
        
            <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 py-2 ">
                    <span className="!bg-gradient-to-r !from-[#24278f] !via-[#5c2eb8] !to-[#00bfff] !bg-clip-text text-transparent  ">¿Por Qué Elegirnos?</span>
                  </h2>
                </div>
        
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* ──────────────── Card 1 ──────────────── */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg" style={{ transform: "none" }}>
                    <div className="w-16 h-16 bg-hero-gradient rounded-xl flex items-center justify-center mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-trending-up w-8 h-8 text-white"
                      >
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 !bg-gradient-to-r from-blue-900 via-cyan-500 to-blue-600 bg-clip-text text-transparent">Mejor Precio</h3>
                    <p className="text-gray-600 text-xl">
                      Ofrecemos los precios más competitivos del mercado con descuentos exclusivos.
                    </p>
                  </div>
        
                  {/* ──────────────── Card 2 ──────────────── */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg" style={{ transform: "none" }}>
                    <div className="w-16 h-16 bg-hero-gradient rounded-xl flex items-center justify-center mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-star w-8 h-8 text-white"
                      >
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 !bg-gradient-to-r from-blue-900 via-cyan-500 to-blue-600 bg-clip-text text-transparent">Calidad Garantizada</h3>
                    <p className="text-gray-600 text-xl">
                      Todos nuestros productos son originales con garantía oficial del fabricante.
                    </p>
                  </div>
        
                  {/* ──────────────── Card 3 ──────────────── */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg" style={{ transform: "none" }}>
                    <div className="w-16 h-16 bg-hero-gradient rounded-xl flex items-center justify-center mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right w-8 h-8 text-white"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 !bg-gradient-to-r from-blue-900 via-cyan-500 to-blue-600 bg-clip-text text-transparent">Envío Rápido</h3>
                    <p className="text-gray-600 text-xl">
                      Entrega rápida y segura en todo el país con seguimiento en tiempo real.
                    </p>
                  </div>
                </div>
              </div>
            </section>
        
        </>
    )
}