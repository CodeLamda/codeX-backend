const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Function to process payment using Stripe
async function processPayment(paymentDetails) {
  try {
    const { amount, currency, source, description } = paymentDetails;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      source,
      description,
    });

    return paymentIntent;
  } catch (error) {
    throw new Error('Failed to process payment');
  }
}

module.exports = {
  processPayment,
};