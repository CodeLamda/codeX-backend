// src/api/controllers/providerService.js

const ProviderService = require('../services/providerService');

// Get all providers
const getAllProviders = async (req, res) => {
  try {
    const providers = await ProviderService.getAllProviders();
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get provider by id
const getProviderById = async (req, res) => {
  const { id } = req.params;
  try {
    const provider = await ProviderService.getProviderById(id);
    if (provider) {
      return res.status(200).json(provider);
    }
    return res.status(404).json({ error: 'Provider not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new provider
const createProvider = async (req, res) => {
  const { name, email, phoneNumber } = req.body;
  try {
    const provider = await ProviderService.createProvider(name, email, phoneNumber);
    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProviders,
  getProviderById,
  createProvider,
};
