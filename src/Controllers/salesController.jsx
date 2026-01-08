import { salesModel } from "../Models/salesModel";

export const salesController = {
  async getAllSales() {
    return await salesModel.getAll();
  },

  async addSales(saleData) {
    return await salesModel.create(saleData);
  },

  async deleteSale(id) {
    return await salesModel.remove(id);
  },
};
