// src/services/providerService.js

const Provider = require('../models/provider');

// Get all providers
const getAllProviders = async () => {
  try {
    const providers = await Provider.find();
    return providers;
  } catch (error) {
    throw new Error('Error fetching providers');
  }
};

// Get provider by id
const getProviderById = async (id) => {
  try {
    const provider = await Provider.findById(id);
    if (!provider) {
      throw new Error('Provider not found');
    }
    return provider;
  } catch (error) {
    throw new Error('Error fetching provider');
  }
};

// Create new provider
const createProvider = async (data) => {
  try {
    const provider = new Provider(data);
    const savedProvider = await provider.save();
    return savedProvider;
  } catch (error) {
    throw new Error('Error creating provider');
  }
};

// Update provider by id
const updateProvider = async (id, data) => {
  try {
    const provider = await Provider.findByIdAndUpdate(id, data, { new: true });
    if (!provider) {
      throw new Error('Provider not found');
    }
    return provider;
  } catch (error) {
    throw new Error('Error updating provider');
  }
};

// Delete provider by id
const deleteProvider = async (id) => {
  try {
    const provider = await Provider.findByIdAndDelete(id);
    if (!provider) {
      throw new Error('Provider not found');
    }
    return provider;
  } catch (error) {
    throw new Error('Error deleting provider');
  }
};

module.exports = {
  getAllProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
};