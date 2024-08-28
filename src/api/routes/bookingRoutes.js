const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Define routes for booking
router.get('/', bookingController.getAllBookings);
router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', bookingController.updateBookingById);
router.delete('/:id', bookingController.deleteBookingById);

module.exports = router;