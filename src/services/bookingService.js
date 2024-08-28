// src/services/bookingService.js

const Booking = require('../models/booking');

const createBooking = async (data) => {
  try {
    const booking = new Booking({
      name: data.name,
      date: data.date,
      time: data.time,
      createdBy: data.createdBy,
    });

    const savedBooking = await booking.save();

    return savedBooking;
  } catch (error) {
    throw new Error('Failed to create booking');
  }
};

const getBookingById = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId);

    return booking;
  } catch (error) {
    throw new Error('Failed to fetch booking details');
  }
};

module.exports = {
  createBooking,
  getBookingById,
};
