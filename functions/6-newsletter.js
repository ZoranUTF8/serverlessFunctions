require("dotenv").config();
const axios = require("axios");
const url = "https://api.buttondown.email/v1/subscribers";

exports.handler = async (event, context) => {
  const method = event.httpMethod;

  if (method !== "POST") {
    return {
      statusCode: 405,
      body: "Only post request allowed",
    };
  }

  const { email } = JSON.parse(event.body);

  try {
    const data = await axios.post(
      url,
      { email },
      {
        headers: {
          Authorization: `Token ${process.env.EMAIL_KEY}`,
        },
      }
    );

    return {
      statusCode: 201,
      body: "Success",
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.response.data),
    };
  }
};
