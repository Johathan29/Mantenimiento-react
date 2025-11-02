import { salesModel } from "../Models/salesModel";

export const salesController = {
  async fetchSales() {
    return await salesModel.getAll();
    
  },

  async addSales(user) {
    return await salesModel.create(user);
  },

  async deleteSales(id) {
    return await salesModel.remove(id);
  }
};