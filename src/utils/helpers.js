// This file contains helper functions that are used across various layers of the application

// Function to generate a random ID
function generateRandomId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomId += chars[randomIndex];
  }
  return randomId;
}

// Function to format a date to a specific format
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

// Function to calculate the average of an array of numbers
function calculateAverage(numbers) {
  const total = numbers.reduce((sum, num) => sum + num, 0);
  return total / numbers.length;
}

// Function to convert a string to uppercase
function convertToUppercase(str) {
  return str.toUpperCase();
}

// Export the helper functions
module.exports = {
  generateRandomId,
  formatDate,
  calculateAverage,
  convertToUppercase,
};