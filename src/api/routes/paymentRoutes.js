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

// Unit tests for paymentRoutes.js

const request = require('supertest');
const express = require('express');
const paymentRoutes = require('../src/api/routes/paymentRoutes');
const paymentController = require('../src/api/controllers/paymentController');
const authMiddleware = require('../src/api/middlewares/authMiddleware');

const app = express();
app.use(express.json());
app.use('/', paymentRoutes);

describe('Payment Routes', () => {
  it('should get all payments', async () => {
    const mockPayments = [
      { id: 1, amount: 10 },
      { id: 2, amount: 20 },
    ];

    const getPaymentsMock = jest.spyOn(paymentController, 'getPayments');
    getPaymentsMock.mockResolvedValue(mockPayments);

    // Make a GET request to '/payments'
    const res = await request(app).get('/');

    // Assert response
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockPayments);

    // Assert if the paymentController.getPayments function is called
    expect(getPaymentsMock).toHaveBeenCalledTimes(1);
  });

  it('should create a new payment', async () => {
    const newPayment = { id: 3, amount: 30 };

    const createPaymentMock = jest.spyOn(paymentController, 'createPayment');
    createPaymentMock.mockResolvedValue(newPayment);

    // Make a POST request to '/payments' with the new payment data
    const res = await request(app).post('/').send(newPayment);

    // Assert response
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(newPayment);

    // Assert if the paymentController.createPayment function is called with the new payment data
    expect(createPaymentMock).toHaveBeenCalledWith(newPayment);
  });

  it('should get a payment by its ID', async () => {
    const paymentId = 1;
    const payment = { id: paymentId, amount: 10 };

    const getPaymentByIdMock = jest.spyOn(paymentController, 'getPaymentById');
    getPaymentByIdMock.mockResolvedValue(payment);

    // Make a GET request to '/payments/:id' with the payment ID
    const res = await request(app).get(`/${paymentId}`);

    // Assert response
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(payment);

    // Assert if the paymentController.getPaymentById function is called with the correct payment ID
    expect(getPaymentByIdMock).toHaveBeenCalledWith(paymentId);
  });

  it('should update a payment', async () => {
    const paymentId = 1;
    const updatedPayment = { id: paymentId, amount: 20 };

    const updatePaymentMock = jest.spyOn(paymentController, 'updatePayment');
    updatePaymentMock.mockResolvedValue(updatedPayment);

    // Make a PUT request to '/payments/:id' with the payment ID and the updated payment data
    const res = await request(app).put(`/${paymentId}`).send(updatedPayment);

    // Assert response
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(updatedPayment);

    // Assert if the paymentController.updatePayment function is called with the correct payment ID and updated payment data
    expect(updatePaymentMock).toHaveBeenCalledWith(paymentId, updatedPayment);
  });

  it('should delete a payment', async () => {
    const paymentId = 1;

    const deletePaymentMock = jest.spyOn(paymentController, 'deletePayment');
    deletePaymentMock.mockResolvedValue();

    // Make a DELETE request to '/payments/:id' with the payment ID
    const res = await request(app).delete(`/${paymentId}`);

    // Assert response
    expect(res.statusCode).toEqual(200);

    // Assert if the paymentController.deletePayment function is called with the correct payment ID
    expect(deletePaymentMock).toHaveBeenCalledWith(paymentId);
  });
});