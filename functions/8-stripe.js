require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
//! frontend send data to our function on the server which in return does the payment logic

exports.handler = async (event, context) => {
  const method = event.httpMethod;

  if (method !== "POST") {
    return {
      statusCode: 405,
      body: "Only post method allowed.",
    };
  }
  const { purchase, total_amount, shipping_fee } = JSON.parse(event.body);
  const calculateOrderAmount = () => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return shipping_fee + total_amount;
  };

  try {
    const payment = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: "bam",
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: payment.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// function orderTotal(ship_fee, tot_amount) {
//   // Calculate the total ont he server to precent people from directly manipulating the amount on the client
//   return ship_fee + tot_amount;
// }
