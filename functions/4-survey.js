require("dotenv").config();

const Airtable = require("airtable-node");

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base(process.env.AIRTABLE_BASE_NAME)
  .table("survey");

exports.handler = async (event, context) => {
  switch (event.httpMethod) {
    case "GET":
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
    case "PUT":
      try {
        //* GET ID AND VOTES
        const { id, votes } = JSON.parse(event.body);

        if (!id || !votes) {
          return {
            statusCode: 400,
            body: "Please provide id and votes properties.",
          };
        }

        //* OBJECT TO UPDATE
        const fields = { votes: Number(votes) + 1 };
        const item = await airtable.update(id, fields);

        if (item.error) {
          return {
            statusCode: 400,
            body: JSON.stringify(item),
          };
        } else {
          return {
            statusCode: 200,
            body: JSON.stringify(item),
          };
        }
      } catch (error) {
        return {
          statusCode: 400,
          bodu: "Error in put requests",
        };
      }

    //* DEFAULT RESPONSE
    default:
      console.log(`Sorry, ${method} is not supported.`);
      return {
        statusCode: 405,
        body: "Only GET and PUT Requests allowed.",
      };
  }
};
