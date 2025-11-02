import { productModel } from "../Models/productModel";
// import { sendEmail } from "../Controllers/NotificarEmail"; // si tienes EmailJS

export const productController = {
  async fetchproduct() {
    return await productModel.getAll();
  },

  async addproduct(codigo, product) {
    return await productModel.create(codigo, product);
  },

  async updateproduct(id, product) {
    // Puedes agregar notificación aquí si lo deseas:
    /*
    await sendEmail({
      name: product.Name,
      notes: `Se ha actualizado el producto ${product.Name} (${product.Category}) con precio $${product.Price}`,
    });
    */
    return await productModel.update(id, product);
  },

  async deleteproduct(id) {
    return await productModel.remove(id);
  },
};
