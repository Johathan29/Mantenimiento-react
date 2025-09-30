import { productController } from '../Controllers/productController';
import { useEffect, useState } from 'react';
import { ProductCard } from '../Components/product/ProductCard.jsx';
import { Timestamp } from 'firebase/firestore';
function ProductsDashboard() {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  const { fetchproduct,addproduct } = productController;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataProducts, setProducts] = useState([]);

  // filtros
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    inStock: false,
  });
 async function newsetProducts(event){
    event.preventDefault();
    const date=new Date();
    const timestampDeFecha = Timestamp.fromDate(date);
    
    console.log(timestampDeFecha); 
    const data = new FormData(event.target);
   const constructProduct={
    Name: data.get("name"),
    Amount: Number(data.get("amount")),
    Price: Number(data.get("price")),
    Category: data.get("category"),
    Supplier: data.get("supplier"),
    Description: data.get("description"),
    created: timestampDeFecha,
    image: "", // luego puedes guardar URL de la imagen subida
  };

  try {
    const newProduct = await addproduct(constructProduct);
    setProducts(prev => [...prev, { ...constructProduct, id: newProduct.id }]);
    event.target.reset(); // limpiar formulario
  } catch (err) {
    console.error("Error al crear producto:", err);
    setError(err);
  }
  }
  
  // scroll infinito
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchproduct();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
   async function handleAdd()  {
    await productController.addproduct({
      Name: "Nuevo Producto",
      Category: "General",
      Description: "Producto agregado desde dashboard",
      Price: 50,
      Amount: 5,
      created: new Date().toISOString(),
    });
   
  };
 
  // manejar scroll
  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setVisibleCount(prev => prev + 12);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    
  }, []);
 

  

  // aplicar filtros
  const filteredProducts = dataProducts.filter((p) => {
    const matchSearch =
      filters.search === "" ||
      p.Name.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.Description.toLowerCase().includes(filters.search.toLowerCase());

    const matchCategory =
      filters.category === "all" || p.Category === filters.category;

    const matchStock = !filters.inStock || p.Amount > 0;

    return matchSearch && matchCategory && matchStock;
  });

  const productsToShow = filteredProducts.slice(0, visibleCount);

  // métricas
  const totalProducts = dataProducts.length;
  const totalStock = dataProducts.reduce((sum, p) => sum + p.Amount, 0);
  const totalValue = dataProducts.reduce((sum, p) => sum + p.Price * p.Amount, 0);

  const categories = ["all", ...new Set(dataProducts.map(p => p.Category))];

  return (
    <>
      <section className=' bg-[#b9d7f15e] '>
        <div className='bg-[#1f2937e3] p-8 md:mb-[0rem] '>
          <div className='max-w-7xl block flex-wrap items-center justify-between mx-auto px-[4rem]'>
            <h2 className='text-[#dde0e5] text-[2.5rem]'>Products</h2>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[4rem] space-y-[4rem] ">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-lg leading-[0.4]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-package h-8 w-8 text-white" aria-hidden="true">
                  <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                  <path d="M12 22V12"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <path d="m7.5 4.27 9 5.15"></path>
                </svg>
              </div>
              <div class="leading-[0.4]">
                <h1 class="text-4xl md:text-5xl font-bold text-[#0f5167] !bg-transparent">
                  Gestión de Productos
                </h1>
                <p class="text-md text-[#414652] max-w-xl mx-auto">
                  Administra tu inventario de manera eficiente
                </p>
              </div>
            </div>
            <button
            data-modal-target="crud-modal" data-modal-toggle="crud-modal"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-primary/90 h-9 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              data-testid="add-product-btn" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-plus h-5 w-5 mr-2" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Nuevo Producto
            </button>
              <div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow-md ">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 class="text-lg font-semibold text-gray-900 ">
                                Create New Product
                            </h3>
                            <button type="button" class="!text-white !bg-red-300  hover:!bg-red-600 hover:text-white rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>

                        <form class="p-4 md:p-5" onSubmit={newsetProducts}>
                            <div class="grid gap-4 mb-4 grid-cols-1">
                                <div class="col-span-2">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                    <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type product name" required=""/>
                                </div>
                                <div class="col-span-2 ">
                                    <label for="Amount" class="block mb-2 text-sm font-medium text-gray-900 ">Amount</label>
                                    <input type="number" name="amount" id="Amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0" min={1}  placeholder="$2999" required=""/>
                                </div>
                                <div class="col-span-2 ">
                                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                                    <input type="number" name="price" id="price" pattern="^\d*(\.\d{0,2})?$" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0" placeholder="$2999" required=""/>
                                </div>
                                <div class="col-span-2 ">
                                    <label for="imagen" class="block mb-2 text-sm font-medium text-gray-900 ">Image of product</label>
                                    <input type="file" name="imagen" id="imagen" accept="image/png, image/jpeg" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0" placeholder="$2999" required=""/>
                                </div>
                                <div class="col-span-2 ">
                                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                                    <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 0">
                                        <option selected="">Select category</option>
                                        <option value="TV">TV/Monitors</option>
                                        <option value="PC">PC</option>
                                        <option value="GA">Gaming/Console</option>
                                        <option value="PH">Phones</option>
                                    </select>
                                </div>
                                <div class="col-span-2 ">
                                    <label for="supplier" class="block mb-2 text-sm font-medium text-gray-900 ">Supplier</label>
                                    <select id="supplier" name='supplier' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 0">
                                        <option selected="">Select category</option>
                                        <option value="dell-company">DEll Company</option>
                                        <option value="samsumg">Samsumg</option>
                                        <option value="apple">Apple</option>
                                    </select>
                                </div>
                                <div class="col-span-2">
                                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 ">Product Description</label>
                                    <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write product description here"></textarea>                    
                                </div>
                            </div>
                            <button type="submit"  class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Add new product
                            </button>
                        </form>
                    </div>
                </div>
            </div> 
          </div>

          {/* filtros */}
          <div class="block md:flex items-center rounded-lg gap-4 mt-6 space-y-3 p-[4rem] bg-gradient-to-r from-blue-500 to-indigo-600 ">
            <div className=' block md:w-1/2 w-full space-y-2'>
              <label htmlFor="buscar" className='text-white font-[600] block'> Buscar productos</label>
              <input
              type="text"
              placeholder="Buscar..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              class="border rounded-md px-3 py-2 border-gray-300 bg-white text-gray-700 w-full h-[39px]"
            />
            </div>
            <div className=' block md:w-1/2 w-full space-y-2'>
              <label htmlFor="buscar" className='text-white font-[600] block'>Categoria</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              class="border rounded-md px-3 py-2 border-gray-300 bg-white text-gray-700 w-full h-[39px]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Todas las categorías" : cat}
                </option>
              ))}
            </select>
            </div>
           <div className=' block md:w-[10rem] w-full space-y-2'>
              <label htmlFor="buscar" className='text-whitefont-[500] block'>Solo en stock</label>
           
                <input value="" class="sr-only peer border rounded-md px-3 py-2 border-gray-300 bg-white text-gray-700 w-full" type="checkbox"
                            checked={filters.inStock}
                            onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}/>
              <div class="relative w-11 h-6 mb-[10px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            </div>
            
          </div>
        </div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 block flex-wrap items-center justify-between min-h-[23rem]'>
          <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 py-6">
            <div class="rounded-xl border text-card-foreground bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
              <div class="p-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-blue-600">Total Productos</p>
                    <p class="text-2xl font-bold text-blue-900" data-testid="total-products">{totalProducts}</p>
                  </div>
                  <div class="bg-blue-100 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-package h-6 w-6 text-blue-600" aria-hidden="true">
                      <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                      <path d="M12 22V12"></path>
                      <polyline points="3.29 7 12 12 20.71 7"></polyline>
                      <path d="m7.5 4.27 9 5.15"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="rounded-xl border text-card-foreground bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
              <div class="lg:p-6 p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-green-600">Total Stock</p>
                    <p class="text-2xl font-bold text-green-900" data-testid="total-stock">{totalStock.toLocaleString('en-US', {
                    })} unidades</p>
                  </div>
                  <div class="bg-green-100 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-chart-column h-6 w-6 text-green-600" aria-hidden="true">
                      <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                      <path d="M18 17V9"></path>
                      <path d="M13 17V5"></path>
                      <path d="M8 17v-3"></path>
                    </svg>
                  </div>
                </div>
              </div>  
            </div>
            <div class="rounded-xl border text-card-foreground bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-lg">
              <div class="p-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-purple-600">Valor Total Inventario</p>
                    <h2 class="text-2xl font-bold text-purple-900" data-testid="total-value">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalValue)} USD
                    </h2>
                  </div>
                  <div class="bg-purple-100 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-trending-up h-6 w-6 text-purple-600" aria-hidden="true">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                      <polyline points="16 7 22 7 22 13"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* listado */}
          <div className=" space-y-4">
            {loading && <p>Cargando productos...</p>}
            {error && <p className="text-red-500">Error cargando productos</p>}
            {!loading && productsToShow.length === 0 && 
            <p className="p-[2rem] bg-white text-red-500 text-[2rem] flex rounded-[12px] items-end gap-2 " >
            No se encontraron productos</p>}
            <ProductCard products={productsToShow} />
            {productsToShow.length < filteredProducts.length && (
              <p className="text-center text-whitepy-4">
                Desplázate para ver más productos...
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductsDashboard;
