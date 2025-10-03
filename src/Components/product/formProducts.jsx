import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { productController } from "../../Controllers/productController";

export function FormProducts({ product, onClose, onSave }) {
  const { addproduct, updateproduct } = productController;

  // 🔹 Función para generar id alfanumérico
  const generarCodigoAlfanumerico = (longitud = 10) => {
    const caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: longitud }, () =>
      caracteres.charAt(Math.floor(Math.random() * caracteres.length))
    ).join("");
  };

  const [formData, setFormData] = useState({
    id: product?.id || "",
    Name: product?.Name || "",
    Amount: product?.Amount || 1,
    Price: product?.Price || 0,
    Category: product?.Category || "",
    Supplier: product?.Supplier || "",
    Description: product?.Description || "",
    image: product?.image || "",
    created: product?.created || null,
  });

  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        ...product,
      }));
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const timestampDeFecha = Timestamp.fromDate(new Date());

    try {
      let savedProduct;

      if (formData.id) {
        // 🔹 Update
        const updated = { ...formData, updated: timestampDeFecha };
        await updateproduct(formData.id, updated);
        savedProduct = updated;
        console.log("Producto actualizado:", updated);
      } else {
        // 🔹 Create → generamos id único
        const codigo = generarCodigoAlfanumerico(10);
        const newProduct = {
          ...formData,
          id: codigo,
          created: timestampDeFecha,
        };
        await addproduct(codigo, newProduct);
        savedProduct = newProduct;
        console.log("Producto creado:", newProduct);
      }

      onSave?.(savedProduct); // notificar al padre
      event.target.reset();
      onClose?.();
    } catch (err) {
      console.error("Error guardando producto:", err);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    onClose?.();
  };

  return (
    <>
      {isModalOpen && (
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {formData.id ? "Update Product" : "Create New Product"}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="!text-white !bg-red-300 hover:!bg-red-600 rounded-full text-sm w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-1">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <input
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="Amount"
                    value={formData.Amount}
                    onChange={handleChange}
                    min={1}
                    required
                    className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Price
                  </label>
                  <input
                    type="number"
                    name="Price"
                    value={formData.Price}
                    onChange={handleChange}
                    step="0.01"
                    required
                    className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Category
                  </label>
                  <select
                    name="Category"
                    value={formData.Category}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                  >
                    <option value="">Select category</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Supplier
                  </label>
                  <select
                    name="Supplier"
                    value={formData.Supplier}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                  >
                    <option value="">Select supplier</option>
                    <option value="dell-company">Dell Company</option>
                    <option value="samsung">Samsung</option>
                    <option value="apple">Apple</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Product Description
                  </label>
                  <textarea
                    name="Description"
                    value={formData.Description}
                    onChange={handleChange}
                    rows="4"
                    className="block p-2.5 w-full rounded-lg border border-gray-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="!text-white inline-flex items-center !bg-blue-700 hover:!bg-blue-800 rounded-lg px-5 py-2.5"
              >
                {formData.id ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
