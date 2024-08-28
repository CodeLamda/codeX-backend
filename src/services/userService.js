const User = require('../models/user');

module.exports = {
  createUser: async (userData) => {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser;
  },

  getUserById: async (userId) => {
    const user = await User.findById(userId);
    return user;
  },

  updateUser: async (userId, userData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUser;
  },

  deleteUser: async (userId) => {
    await User.findByIdAndDelete(userId);
  }
};