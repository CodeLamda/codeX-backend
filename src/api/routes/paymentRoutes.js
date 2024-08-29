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

// Apply rate limiter to all routes
router.use(limiter);

router.get('/', authMiddleware, paymentController.getPayments);
router.post('/', authMiddleware, paymentController.createPayment);
router.get('/:id', authMiddleware, paymentController.getPaymentById);
router.put('/:id', authMiddleware, paymentController.updatePayment);
router.delete('/:id', authMiddleware, paymentController.deletePayment);

module.exports = router;