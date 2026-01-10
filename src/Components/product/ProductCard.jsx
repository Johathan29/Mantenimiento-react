import { Star, ShoppingCart, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Metric from "./Metric";
import { FormProducts } from "./formProducts";
import { productController } from "../../Controllers/productController";
import { Timestamp } from "firebase/firestore";
import axios from "axios";

export const ProductCard = ({ products }) => {
  const api = import.meta.env.VITE_API_BASE_URL;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchproduct, deleteproduct } = productController;
  const [dataProducts, setProducts] = useState([]);
const [datecreated, setdatecreated]=useState('')
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(`${api}/api/products`);
      setProducts(data);
    }
    fetchData();
  }, []);

 
  const formatFirebaseDate = (date) => {
    console.log(date)
     const options = {

    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateTimeFormat3 = new Intl.DateTimeFormat("es-US", options);
    if (!date) return "Sin fecha";
    try {
      // Caso 1: Firestore Timestamp
      if (date.toDate) {
        return dateTimeFormat3.format(date.toDate());
      }
  
      // Caso 2: Date nativo
      if (date instanceof Date) {
        return dateTimeFormat3.format(date);
      }
  
      // Caso 3: String o número
      return dateTimeFormat3.format(new Date(date));
    } catch (e) {
      console.error("Error formateando fecha:", e);
      return "Fecha inválida";
    }
  };

console.log(datecreated)
  const handlePrintOne = (product) => {
    const content = `
      <html>
        <head>
          <title>${product.Name}</title>
          <style>
            body {font-family:Arial, sans-serif; margin: 20px;}
            h1 {text-align: left;}
            .header {display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding: 2rem;}
            table {width:100%; border-collapse: collapse; margin-top: 20px;}
            th, td {border:1px solid #ccc; padding:8px; text-align:left;}
            th {background:#f4f4f4;}
            .footer {margin-top:30px; text-align:right; font-size:14px;}
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🛒 Mi Empresa</div>
            <div><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</div>
          </div>
          <h1>Detalle de Producto</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Nombre</th><th>Categoría</th><th>Descripción</th>
                <th>Precio</th><th>Cantidad</th><th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${product.id}</td>
                <td>${product.Name}</td>
                <td>${product.Category}</td>
                <td>${product.Description}</td>
                <td>$${product.Price.toLocaleString()}</td>
                <td>${product.Amount}</td>
                <td>$${(product.Price * product.Amount).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          <div class="footer">Generado automáticamente por el sistema</div>
        </body>
      </html>`;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  const handleSave = (product) => {
    if (products.find((p) => p.id === product.id)) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts((prev) => [...prev, product]);
    }
  };

  const updateModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  async function productdelete(id) {
    await deleteproduct(id);
  }

  return (
    <>
     
        {products.map((product, index) => (
         <div
  key={index}
  className="relative group transition-all duration-300"
>
  {/* Capa principal del card */}
  <div
    className="relative rounded-xl text-card-foreground bg-gradient-to-br from-[#061024] to-[#0b244d]
    shadow-[0_4px_12px_rgba(0,0,0,0.3)] overflow-hidden
    flex flex-col justify-between transition-all duration-500 ease-out
    transform-gpu group-hover:-translate-y-1"
  >
    {/* Efecto halo azul cian */}
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-700/30 blur-xl"></div>
    </div>

    {/* Contenido */}
    <div className="relative p-6 flex flex-col gap-4 z-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
        <div className="flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {product.id}
            </span>
            <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-gradient-to-r from-indigo-100 to-blue-100 text-cyan-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-tag h-3 w-3 mr-1"
              >
                <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
              {product.Category}
            </div>
          </div>

          <h4 className="text-xl font-semibold text-white/80 mb-1 group-hover:text-white transition-colors">
            {product.Name}
          </h4>
          <p className="text-white/60 text-sm leading-relaxed max-w-prose break-words">
            {product.Description}
          </p>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 mt-3">
        <Metric
          label="Precio"
          value={new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(product.Price)}
          color="green"
        />
        <Metric
          label="Stock"
          value={product.Amount.toLocaleString("en-US")}
          color="blue"
        />
        <Metric
          label="Valor Total"
          value={new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(product.Price * product.Amount)}
          color="purple"
        />
        <Metric
          label="Creado"
          value={formatFirebaseDate(product.created)}
          color="slate"
        />
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-4">
        <button
          type="button"
          onClick={() => updateModal(product)}
          className="flex-1 rounded-lg bg-[#66CAF4] border border-[#bedaeb] text-[#042A67] text-base font-semibold py-3 hover:bg-[#1697da] hover:text-white transition-colors"
        >
          <i className="fa-solid fa-pen-to-square mr-1"></i> Editar
        </button>

        <button
          onClick={() => productdelete(product.id)}
          className="flex-1 rounded-lg bg-[#F8CECE] border border-[#bedaeb] text-[#7D0C0C] text-base font-semibold py-3 hover:bg-[#7D0C0C] hover:text-white transition-colors"
        >
          <i className="fa-solid fa-trash mr-1"></i> Eliminar
        </button>

        <button
          onClick={() => handlePrintOne(product)}
          className="flex-1 rounded-lg bg-[#c4c918] border border-[#bedaeb] text-[#495408] text-base font-semibold py-3 hover:bg-[#495408] hover:text-white transition-colors"
        >
          <i className="fa-solid fa-print mr-1"></i> Imprimir
        </button>
      </div>
    </div>
  </div>
</div>

        ))}
     

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-12 left-0 w-full h-full  bg-[#2726265c] flex justify-center items-center z-50 p-4 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto max-h-[90%]">
            <FormProducts
              product={selectedProduct}
              onClose={closeModal}
              onSave={handleSave}
            />
          </div>
        </div>
      )}
    </>
  );
};
