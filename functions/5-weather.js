require('dotenv').config()
const axios = require('axios')

const apiUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric&q=`;

exports.handler = async (event, context) => {
  const method = event.httpMethod;

  if (method !== "POST") {
    return {
      headers: { "Access-Control-Allow-Origin": "*" },
      statusCode: 405,
      body: "ONLY POST REQUEST ALLOWED",
    };
  }

  const { city } = JSON.parse(event.body);
  try {
    const resp = await axios.get(`${apiUrl}${city}`);
    return {
      statusCode: 200,
      body: JSON.stringify(resp.data),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error),
    };
  }
};
