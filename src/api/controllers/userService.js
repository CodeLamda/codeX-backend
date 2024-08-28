// userService.js

const User = require('../models/user');

// Get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

// Get user by ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

// Create a new user
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

// Update user by ID
const updateUserById = async (userId, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// Delete user by ID
const deleteUserById = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};