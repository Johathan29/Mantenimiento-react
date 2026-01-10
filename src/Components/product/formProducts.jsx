import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timestamp } from "firebase/firestore";
import { productController } from "../../Controllers/productController";

export function FormProducts({ product, onClose, onSave }) {
  const { addproduct, updateproduct } = productController;

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
    imagen: product?.image || "",
    caracteristicas: product?.caracteristicas || [],
    especificaciones: product?.especificaciones || [],
    created: product?.created || null,
  });

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showNotification, setShowNotification] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const [newFeature, setNewFeature] = useState("");
  const [newSpec, setNewSpec] = useState("");

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

  // ✅ Notificación temporal animada
  const showTempNotification = (message, type = "success") => {
    setShowNotification({ visible: true, message, type });
    setTimeout(() => {
      setShowNotification({ visible: false, message: "", type });
    }, 2500);
  };

  // ✅ CRUD dinámico de características/especificaciones
  const handleAdd = (type) => {
    const newValue = type === "feature" ? newFeature : newSpec;
    if (!newValue.trim()) return;

    setFormData((prev) => ({
      ...prev,
      [type === "feature" ? "caracteristicas" : "especificaciones"]: [
        ...prev[type === "feature" ? "caracteristicas" : "especificaciones"],
        newValue,
      ],
    }));

    if (type === "feature") setNewFeature("");
    else setNewSpec("");

    showTempNotification(`${type === "feature" ? "Feature" : "especificaciones"} added successfully!`);
  };

  const handleRemove = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type === "feature" ? "caracteristicas" : "especificaciones"]:
        prev[type === "feature" ? "caracteristicas" : "especificaciones"].filter(
          (_, i) => i !== index
        ),
    }));
    showTempNotification(`${type === "feature" ? "Feature" : "especificaciones"} removed`, "warning");
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const timestampDeFecha = Timestamp.now();

    try {
      let savedProduct;

      if (formData.id) {
        const updated = { ...formData, updated: timestampDeFecha };
        await updateproduct(formData.id, updated);
        savedProduct = updated;
        showTempNotification("Product updated successfully!", "success");
      } else {
        const codigo = generarCodigoAlfanumerico(10);
        const newProduct = {
          ...formData,
          id: codigo,
          created: timestampDeFecha,
        };
        await addproduct(codigo, newProduct);
        savedProduct = newProduct;
        showTempNotification("Product added successfully!", "success");
      }

      onSave?.(savedProduct);
      event.target.reset();
      onClose?.();
    } catch (err) {
      console.error("Error guardando producto:", err);
      showTempNotification("Error saving product!", "error");
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    onClose?.();
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-40 ">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-[#02050c]/95 to-[#0b244d]/95 border border-[#1e3a8a]/40 rounded-2xl shadow-2xl overflow-hidden max-h-[35rem] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#1e3a8a]/40">
              <h3 className="text-xl font-semibold text-white tracking-wide">
                {formData.id ? "Update Product" : "Add New Product"}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 text-white">
              {/* Campos principales */}
              <details className="border-1 rounded-md border-[#06b6d4]">
                <summary className="p-2 ronded-md bg-white text-[#06b6d4] font-bold">
                  Campos principales
                </summary>
             
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <label className="text-sm text-gray-300">Name</label>
                  <input
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    className="w-full mt-1 p-2.5 rounded-lg bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300">Amount</label>
                  <input
                    type="number"
                    name="Amount"
                    value={formData.Amount}
                    onChange={handleChange}
                    min={1}
                    className="w-full mt-1 p-2.5 rounded-lg bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300">Price</label>
                  <input
                    type="number"
                    name="Price"
                    step="0.01"
                    value={formData.Price}
                    onChange={handleChange}
                    className="w-full mt-1 p-2.5 rounded-lg bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300">Category</label>
                  <select
                    name="Category"
                    value={formData.Category}
                    onChange={handleChange}
                    className="w-full mt-1 p-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:border-cyan-400 group"
                  >
                    <option value="" className="group-hover:bg-black">Select category</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-gray-300">Description</label>
                  <textarea
                  required
                    name="Description"
                    rows="3"
                    value={formData.Description}
                    onChange={handleChange}
                    className="w-full mt-1 p-2.5 rounded-lg bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 outline-none"
                  />
                </div>
              </div>
            </details>
           <details className="border-1 rounded-md border-[#06b6d4]">
              <summary className="p-2 ronded-md bg-white text-[#06b6d4] font-bold">
                 Características
              </summary>
              {/* Características */}
              
                <div className="flex gap-2 mb-2 p-4">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add feature"
                    className="flex-1 p-2.5 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleAdd("feature")}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1 text-sm px-4 pb-4">
                  {formData.caracteristicas.map((feat, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center bg-white/10 px-3 py-2 rounded-lg"
                    >
                      {feat}
                      <button
                        type="button"
                        onClick={() => handleRemove("feature", i)}
                        className="text-red-400 hover:text-red-600"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              
            </details>
             <details className="border-1 rounded-md border-[#06b6d4]">
                <summary className="p-2 ronded-md bg-white text-[#06b6d4] font-bold">
                 Especificaciones
                </summary>
              {/* Especificaciones */}
                <div className="flex gap-2 mb-2 p-4">
                  <input
                    type="text"
                    value={newSpec}
                    onChange={(e) => setNewSpec(e.target.value)}
                    placeholder="Add specification"
                    className="flex-1 p-2.5 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleAdd("spec")}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1 text-sm px-4 pb-4">
                  {formData.especificaciones.map((spec, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center bg-white/10 px-3 py-2 rounded-lg"
                    >
                      {spec}
                      <button
                        type="button"
                        onClick={() => handleRemove("spec", i)}
                        className="text-red-400 hover:text-red-600"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </details>

              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold shadow-md shadow-cyan-500/20 transition"
                >
                  {formData.id ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ✅ Modal de notificación animado */}
      <AnimatePresence>
        {showNotification.visible && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.4 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-white font-medium ${
              showNotification.type === "success"
                ? "bg-green-500"
                : showNotification.type === "warning"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {showNotification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
