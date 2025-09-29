import { productModel } from "../Models/productModel";
import { useState } from "react";
  
export const productController = {

  async fetchproduct() {
    return await productModel.getAll();
    
  },

  async addproduct(product) {
    return await productModel.create(product);
  },

  async deleteproduct(id) {
    return await productModel.remove(id);
  },
  async useProductRating(id){
    return await productModel.useProductRating(id)
  }
};