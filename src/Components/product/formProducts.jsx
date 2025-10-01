import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
export  function FormProducts({ product, onClose }){

    const [selectedProduct, setSelectedProduct] = useState([
        {
            Name: product?.Name,
            Amount: Number(product?.Amount),
            Price: Number(product?.Price),
            Category: product?.Category,
            Supplier: product?.Supplier,
            Description: product?.Description,
            
            image:''
        }
    ]);
    
      console.log((selectedProduct?.Description))
    const [isModalOpen, setIsModalOpen] = useState(true);
    useEffect(()=>{
        if(isModalOpen===true)
        {
            setSelectedProduct(product)
        }
        
    },[])
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
      const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
      };
return(
    <>
{isModalOpen && (
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow-md ">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 class="text-lg font-semibold text-gray-900 ">
                                Create New Product
                            </h3>
                            <button type="button"  onClick={closeModal} class="!text-white !bg-red-300  hover:!bg-red-600 hover:text-white rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
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
                                    <input type="text" value={selectedProduct?.Name} name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type product name" required=""/>
                                </div>
                                <div class="col-span-2 ">
                                    <label for="Amount" class="block mb-2 text-sm font-medium text-gray-900 ">Amount</label>
                                    <input type="number" name="amount" id="Amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0" min={1}  placeholder="$2999" required=""/>
                                </div>
                                <div class="col-span-2 ">
                                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                                    <input type="number" value={selectedProduct?.Price}name="price" id="price" pattern="^\d*(\.\d{0,2})?$" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0" placeholder="$2999" required=""/>
                                </div>
                                <div class="col-span-2 ">
                                    <label for="imagen" class="block mb-2 text-sm font-medium text-gray-900 ">Image of product</label>
                                    <input type="file" name="imagen" id="imagen" value={selectedProduct?.Imagen} accept="image/png, image/jpeg" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0" placeholder="$2999" required=""/>
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
                                    <label for="description"  class="block mb-2 text-sm font-medium text-gray-900 ">Product Description</label>
                                    <textarea id="description" value={selectedProduct?.Description} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write product description here"/>
                                </div>
                            </div>
                            <button type="submit"  class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Add new product
                            </button>
                        </form>
                    </div>
                </div>
                )}
            
    </>
)
}