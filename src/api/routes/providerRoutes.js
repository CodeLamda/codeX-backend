const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');

// Create a new provider
router.post('/providers', providerController.createProvider);

// Get all providers
router.get('/providers', providerController.getAllProviders);

// Get a single provider by id
router.get('/providers/:id', providerController.getProviderById);

// Update a provider by id
router.put('/providers/:id', providerController.updateProviderById);

// Delete a provider by id
router.delete('/providers/:id', providerController.deleteProviderById);

module.exports = router;