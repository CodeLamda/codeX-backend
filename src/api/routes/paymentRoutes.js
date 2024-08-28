// src/api/routes/paymentRoutes.js

const express = require('express');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, paymentController.getPayments);
router.post('/', authMiddleware, paymentController.createPayment);
router.get('/:id', authMiddleware, paymentController.getPaymentById);
router.put('/:id', authMiddleware, paymentController.updatePayment);
router.delete('/:id', authMiddleware, paymentController.deletePayment);

module.exports = router;