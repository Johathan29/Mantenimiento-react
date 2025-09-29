import { userModel } from "../Models/userModel";

export const userController = {
  async fetchUsers() {
    return await userModel.getAll();
    
  },

  async addUser(user) {
    return await userModel.create(user);
  },

  async deleteUser(id) {
    return await userModel.remove(id);
  }
};