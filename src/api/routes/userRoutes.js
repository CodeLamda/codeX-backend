const express = require('express');
const router = express.Router();

// Import the userController
const userController = require('../controllers/userController');

// Define the API endpoints for users
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;