// src/api/routes/paymentRoutes.js

const express = require('express');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Import express-rate-limit
const RateLimit = require('express-rate-limit');

// Create a rate limiter
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 minutes
});

router.get('/', authMiddleware, limiter, paymentController.getPayments);
router.post('/', authMiddleware, limiter, paymentController.createPayment);
router.get('/:id', authMiddleware, limiter, paymentController.getPaymentById);
router.put('/:id', authMiddleware, limiter, paymentController.updatePayment);
router.delete('/:id', authMiddleware, limiter, paymentController.deletePayment);

module.exports = router;