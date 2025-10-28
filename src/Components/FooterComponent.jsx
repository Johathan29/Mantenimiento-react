import { NavLink } from "react-router-dom";
import logo from '../assets/react.svg';
export default function Footer() {
    const navegation = [
    { id: 1, title: "Home", pathname: "/" },
   // { id: 2, title: "Collaborators", pathname: "/our_collaborators" },
    { id: 3, title: "About", pathname: "/about" },
    { id: 4, title: "Product", pathname: "/products" },
    { id: 5, title: "Contact", pathname: "/contact" },
  ];

  return (
    <footer className=" bg-hero-gradient border-t border-border ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* LOGO Y DESCRIPCIÓN */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-hero rounded-lg flex items-center justify-center">
                 <img src={logo} className="h-8 animate-spin" alt="Logo" />
              </div>
              <span className="text-3xl font-bold !text-foreground">
                Solutions<span className="!text-sky-500"> Supports</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Tu destino confiable para la última tecnología. Calidad garantizada y los mejores precios.
            </p>
            <div className="flex space-x-3">
              <a
                href="#" target="_blank"
                className="!text-[1.3rem] !text-white hover:!text-sky-500 rounded-full"
              >
                <i class="fa-brands fa-facebook"></i>
              </a>
              <a
                href="#" target="_blank"
                className="!text-[1.3rem] !text-white hover:!text-sky-500 rounded-full"
              >
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a
                href="#" target="_blank"
                className="!text-[1.3rem] !text-white hover:!text-sky-500 rounded-full"
              >
                <i class="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>

          {/* ENLACES RÁPIDOS */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {navegation.map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.pathname}
                    className="text-white hover:!text-accent transition-colors !text-sm"
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ATENCIÓN AL CLIENTE */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Atención al Cliente</h3>
            <ul className="space-y-2">
              {[
                "Mi Cuenta",
                "Seguimiento de Pedido",
                "Devoluciones",
                "Ayuda",
                "Términos y Condiciones",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-accent transition-colors !text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACTO */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
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
                  className="lucide lucide-map-pin h-5 w-5 text-accent flex-shrink-0 mt-0.5 stroke-sky-500"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-muted-foreground !text-sm">
                  Calle Tecnología 123, Madrid, España
                </span>
              </li>
              <li className="flex items-center space-x-3 !text-sm">
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
                  className="lucide lucide-phone h-5 w-5 text-accent flex-shrink-0 stroke-sky-500"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-muted-foreground !text-sm">+34 900 123 456</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
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
                  className="lucide lucide-mail h-5 w-5 text-accent flex-shrink-0 stroke-sky-500 stroke-sky-500"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a
                    href="mailto:info@techstore.com"
                    className="text-muted-foreground hover:text-accent transition-colors !p-0"
                  >
                    info@techstore.com
                  </a>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground !text-sm">
            © {new Date().getFullYear()} Solutions Supports. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
