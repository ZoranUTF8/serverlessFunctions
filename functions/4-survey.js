require("dotenv").config();

const Airtable = require("airtable-node");

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base(process.env.AIRTABLE_BASE_NAME)
  .table("survey");

exports.handler = async (event, context) => {
  try {
    const { records } = await airtable.list();

    const survey = records.map((item) => {
      const { id } = item;
      const { room, votes } = item.fields;

      return { id, room, votes };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(survey),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "ERROR IN 4-survey.js",
    };
  }
};
