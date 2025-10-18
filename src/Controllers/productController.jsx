import { productModel } from "../Models/productModel";
import { useState } from "react";

export const productController = {

  async fetchproduct() {
    return await productModel.getAll();
    
  },

  async addproduct(codigo,product) {
    return await productModel.create(codigo,product);
  },
  async updateproduct(id,product) {
   await sendEmail({
    name: product.Name,
    notes: `Se ha registrado un nuevo producto en la categoría ${product.Category} con precio $${product.Price}`,
  });
    return await productModel.update(id,product);
  },
  async deleteproduct(id) {
    return await productModel.remove(id);
  },
  async useProductRating(id){
    return await productModel.useProductRating(id)
  }
};