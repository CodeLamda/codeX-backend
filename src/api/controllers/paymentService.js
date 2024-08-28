const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentService = {
  createPaymentIntent: async (amount, currency, paymentMethod) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethod,
        confirm: true,
      });

      return paymentIntent;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  retrievePaymentIntent: async (paymentIntentId) => {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      return paymentIntent;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = paymentService;