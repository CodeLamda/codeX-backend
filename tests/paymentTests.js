const express = require('express');
const mongoose = require('mongoose');
const app = express();

// configure express to use JSON as the body parser
app.use(express.json());

// connect to MongoDB
mongoose.connect('mongodb://localhost/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// define routes
app.use('/api/payments', require('./routes/paymentRoutes'));

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;