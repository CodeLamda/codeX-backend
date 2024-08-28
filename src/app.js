// app.js

const express = require('express');
const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();

// Set up the Express app
const app = express();

// Set up middleware
app.use(express.json());

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Check if the MongoDB connection is successful
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Handle MongoDB connection error
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

// Define API routes
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Page not found' });
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;