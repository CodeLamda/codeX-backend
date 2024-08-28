const BookingService = require('../services/bookingService');

module.exports = {
  createBooking: async (req, res, next) => {
    try {
      const booking = await BookingService.createBooking(req.body);
      res.status(201).json(booking);
    } catch (error) {
      next(error);
    }
  },
  getBooking: async (req, res, next) => {
    try {
      const booking = await BookingService.getBooking(req.params.id);
      res.json(booking);
    } catch (error) {
      next(error);
    }
  },
  updateBooking: async (req, res, next) => {
    try {
      const booking = await BookingService.updateBooking(req.params.id, req.body);
      res.json(booking);
    } catch (error) {
      next(error);
    }
  },
  deleteBooking: async (req, res, next) => {
    try {
      await BookingService.deleteBooking(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
};