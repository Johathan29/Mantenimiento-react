import { productController } from '../Controllers/productController';
import { useEffect, useState } from 'react';
import { ProductCard } from '../Components/product/ProductCard.jsx';
import { FormProducts } from '../Components/product/formProducts.jsx';
import ChartProducts from '../Components/product/chartProducts.jsx';
import { exportCSV, exportPDF, exportExcel } from '../Components/product/exports';
import { ContactForm } from '../Controllers/NotificarEmail.jsx';
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from 'lucide-react';

function ProductsDashboard() {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  const { fetchproduct, addproduct } = productController;
  const api = import.meta.env.VITE_API_BASE_URL;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [dataProducts, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    inStock: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${api}/api/products`);
        const products = res.data;
        setProducts(products);
        setFilteredProducts(products);
        setCategories([...new Set(products.map(p => p.Category))]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [api]);

  useEffect(() => {
    const searchTerm = filters.search.trim().toLowerCase();
    const filtered = dataProducts.filter((p) => {
      const matchSearch =
        searchTerm === "" ||
        Object.values(p).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm)
        );
      const matchCategory =
        filters.category === "all" ||
        (p.Category && p.Category.toLowerCase() === filters.category.toLowerCase());
      const matchStock = !filters.inStock || p.Amount > 0;
      return matchSearch && matchCategory && matchStock;
    });
    setFilteredProducts(filtered);
  }, [filters, dataProducts]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const productsToShow = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const totalProducts = filteredProducts.length;
  const totalStock = filteredProducts.reduce((sum, p) => sum + p.Amount, 0);
  const totalValue = filteredProducts.reduce((sum, p) => sum + p.Price * p.Amount, 0);

  const updateModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 🎬 Variantes de animación reutilizables
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section className="bg-gradient-to-br from-[#000a3c] to-[#04156a] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-box-open text-[#9f9999] text-6xl"></i>
            <div>
              <h2
                className="text-[#9f9999] text-4xl sm:text-5xl font-bold border-b-2 border-white/20"
                style={{ textShadow: '3px 0px 0px #fffefe' }}
              >
                Gestión de Productos
              </h2>
              <span className="text-sm ml-2 text-white/70">
                Administra tu inventario de manera eficiente
              </span>
            </div>
          </div>

          {/* Botón Nuevo Producto */}
          <motion.button
            onClick={updateModal}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl border transition-all duration-300"
          >
            <Plus className="h-5 w-5 shrink-0 text-cyan-400" />
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              whileHover={{ opacity: 1, x: 4 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="hidden group-hover:inline-block group-hover:text-cyan-400"
            >
              Nuevo Producto
            </motion.span>
          </motion.button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-[#2726265c] flex justify-center items-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:max-w-lg"
            >
              <FormProducts product={productsToShow} onClose={closeModal} />
            </motion.div>
          </div>
        )}

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-10 bg-gradient-to-br from-[#061024] to-[#0b244d] shadow-[2px_7px_9px_4px,0_8px_1px_3px] shadow-black/20 rounded-lg p-6"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Buscar */}
            <div className="w-full md:w-1/2">
              <label className="text-white font-semibold block mb-1">Buscar productos</label>
              <input
                type="text"
                placeholder="Buscar..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="border rounded-md px-3 py-2 border-gray-300 bg-white text-gray-700 w-full"
              />
            </div>

            {/* Categoría */}
            <div className="w-full md:w-1/3">
              <label className="text-white font-semibold block mb-1">Categoría</label>
              <select
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full border rounded-md px-3 py-2 text-gray-700 bg-white"
              >
                <option value="all">Todas las categorías</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Solo en stock */}
            <div className="flex flex-col justify-end">
              <label className="text-white font-semibold mb-1">Solo en stock</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  gap-6 py-10">
          {[ 
            { label: "Total Productos", value: totalProducts.toLocaleString('en-US', { }), icon: "fa-box" },
            { label: "Total Stock", value: totalStock.toLocaleString('en-US', { }), icon: "fa-chart-column" },
            { label: "Valor Total Inventario", value: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalValue), special: true, icon: "fa-chart-column" },
            { label: "Exports Data", value: "export", special: "export" }
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`rounded-xl ${
                item.special === true
                  ? "bg-gradient-to-br from-[#02050c] to-[#0b244d] shadow-[2px_7px_9px_4px,0_8px_1px_3px] shadow-black/20 "
                  : item.special === "export"
                  ? "bg-gradient-to-br from-[#02050c] to-[#0b244d] shadow-[2px_7px_9px_4px,0_8px_1px_3px] shadow-black/20 text-white"
                  : "bg-gradient-to-br from-[#02050c] to-[#0b244d] shadow-[2px_7px_9px_4px,0_8px_1px_3px] shadow-black/20  text-white"
              } p-6 `}
            >
              {item.special === "export" ? (
                <>
                  <h5 className="text-white text-md font-bold mb-2 flex items-center justify-between">Exports Data <i class="fa-solid fa-download text-cyan-400 text-xl" ></i></h5>
                  <div className="flex gap-3">
                    <button onClick={() => exportCSV(dataProducts)} className="text-green-500 text-2xl hover:text-green-700"><i className="fa-solid fa-file-csv"></i></button>
                    <button onClick={() => exportExcel(dataProducts)} className="text-green-600 text-2xl hover:text-green-800"><i className="fa-solid fa-file-excel"></i></button>
                    <button onClick={() => exportPDF(dataProducts)} className="text-red-500 text-2xl hover:text-red-700"><i className="fa-solid fa-file-pdf"></i></button>
                  </div>
                </>
              ) : item.special === true ? (
                <>
                  <div className="flex justify-between mb-4 items-center">
                    <p className="text-sm font-bold">{item.label}</p>
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-trending-up h-6 w-6 text-cyan-400" aria-hidden="true">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                      <polyline points="16 7 22 7 22 13"></polyline>
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-center">{item.value} <span className="!text-sm !text-gray-400/70">{item.label==='Valor Total Inventario' ? 'US':""}</span></p>
                </>
              ) : (
                <>
                  <div className="flex justify-between mb-4 items-center">
                    <p className="text-sm font-bold">{item.label}</p>
                    <i className={`fa-solid ${item.icon} text-cyan-400 text-xl`}></i>
                  </div>
                  <p className="text-2xl font-bold text-center">{item.value} <span className="!text-sm !text-gray-400/70">{item.label==='Total Stock' ? 'unidades':""}</span></p>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Listado */}
        <div className="mb-8">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-10 text-center rounded-xl shadow"
            >
              Cargando...
            </motion.div>
          )}
          {error && <p className="text-red-500">Error cargando productos</p>}
          {!loading && productsToShow.length === 0 && (
            <p className="bg-white text-red-500 text-2xl p-6 rounded-xl text-center">No se encontraron productos</p>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-4"
            >
              <ProductCard products={productsToShow } />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={`px-4 py-2 rounded-l-lg ${
                currentPage === 1 ? "bg-gray-400/20 text-gray-500 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-sky-400/10 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className={`px-4 py-2 rounded-r-lg ${
                currentPage === totalPages ? "bg-gray-400/20 text-gray-500 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Siguiente
            </button>
          </div>
        )}

        <ChartProducts />
        <ContactForm />
      </div>
    </section>
  );
}

export default ProductsDashboard;
