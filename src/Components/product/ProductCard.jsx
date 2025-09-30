
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useEffect, useState } from "react";
//import { useCart } from "../../contexts/CartContext";
import { toast } from "sonner";
import Metric from "./Metric";
import { Timestamp } from 'firebase/firestore';
export const ProductCard = ({ products }) =>   {
  //const { addItem } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
const [dataProducts,setProducts]=useState([])
  /*const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} agregado al carrito`);
  };
*/
 /* const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
*/
useEffect(()=>{

}
,[])
const hendleUpdate=(product)=>{
console.log(product)
}
const handlePrintOne = (product) => {
   const content = `
      <html>
        <head>
          <title>${product.Name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; }
            .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
            .logo { font-weight:bold; font-size:18px; }
            table { width:100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border:1px solid #ccc; padding:8px; text-align:left; }
            th { background:#f4f4f4; }
            .footer { margin-top:30px; text-align:right; font-size:14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🛒 Mi Empresa</div>
            <div><b>Fecha:</b> ${new Date().toLocaleDateString()}</div>
          </div>
          <h1>Detalle de Producto</h1>
          <table>
            <tr><th>ID</th><td>${product.id}</td></tr>
            <tr><th>Nombre</th><td>${product.Name}</td></tr>
            <tr><th>Categoría</th><td>${product.Category}</td></tr>
            <tr><th>Descripción</th><td>${product.Description}</td></tr>
            <tr><th>Precio</th><td>$${product.Price}</td></tr>
            <tr><th>Cantidad</th><td>${product.Amount}</td></tr>
            <tr><th>Total</th><td>$${product.Price * product.Amount}</td></tr>
          </table>
          <div class="footer">Generado automáticamente por el sistema</div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };
  const options = {
  
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateTimeFormat3 = new Intl.DateTimeFormat("es-US", options);
  const formatFirebaseDate = (date) => {
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
  return (
    <>
    
  {/* <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            onClick={handleAddToCart}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            disabled={!product.inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.inStock ? "Agregar al carrito" : "No disponible"}
          </Button>
        </div> */}
        {products.map((product,index)=>(
        <div key={index} class="rounded-xl text-card-foreground bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 " data-testid="product-card-885993af-316d-411b-8bb1-f99034567d4d">
      <div class="p-6">
        <div class="lg:flex block  flex-col-2   lg:items-start lg:justify-between gap-4">
          <div class="flex-1 space-y-3">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                   {product.id}
                    </span>
                    <div class="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 border-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag h-3 w-3 mr-1" aria-hidden="true">
                        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z">
                        </path>
                        <circle cx="7.5" cy="7.5" r=".5" fill="currentColor">
                        </circle>
                      </svg>{product.Category}
                    </div>
                  </div>
                <h4 class="text-xl font-semibold text-slate-900 mb-2">
                  {product.Name}
                </h4>
                <p class="text-slate-600 text-sm leading-relaxed max-w-2xl ">{product.Description}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <Metric key="1" label="Precio" value={`${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.Price)} USD`} color="green" />
              <Metric key="2" label="Stock" value={product.Amount+ 'unidades'} color="blue" />
              <Metric key="3" label="Valor Total" value={`${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.Price * product.Amount)} USD`} color="purple" />
             <Metric
  key="4"
  label="Creado"
  value={
    formatFirebaseDate(product.created )
        
  }
  color="slate"
/>

          </div>
        </div>
        <div class="md:space-y-3 space-x-3 flex md:block">
          <button onClick={hendleUpdate(1)} class="w-full  md:w-1/2 !bg-[#66CAF4] border-1 !border-[#bedaeb] !text-[#042A67] text-lg py-[1.2rem] px-[1.2rem] !font-bold hover:!bg-[#1697da] hover:!text-white">
           <i class="fa-solid fa-pen-to-square"></i> Editar
          </button> 
          <button class="w-full md:w-1/2 !bg-[#F8CECE] border-1 !border-[#bedaeb] !text-[#7D0C0C] text-lg py-[1.2rem] px-[1.2rem] !font-bold hover:!bg-[#7D0C0C] hover:!text-white">
           <i class="fa-solid fa-trash"></i> Delete
          </button> 
          <button className="bg-indigo-600 hover:bg-indigo-800 text-white md:w-1/2w-full md:w-1/2 !bg-[#c4c918] border-1 !border-[#bedaeb] !text-[#495408] text-lg py-[1.2rem] px-[1.2rem] !font-bold hover:!bg-[#495408] hover:!text-white"
                onClick={() => handlePrintOne(product)}
              >
               <i class="fa-solid fa-print"></i> Imprimir
              </button>
        </div>
       
        </div></div></div>
        ))}
    </>
  );
};
