require("dotenv").config();

const Airtable = require("airtable-node");

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base(process.env.AIRTABLE_BASE_NAME)
  .table("products");

exports.handler = async (event, context) => {
  //? get the data id
  const { id } = event.queryStringParameters;
  //! if id available get single product
  if (id) {
    try {
      const product = await airtable.retrieve(id);

      //? case error return 400
      if (product.error) {
        return {
          headers: { "Access-Control-Allow-Origin": "*" },
          statusCode: 404,
          body: `No such product available id=${id}`,
        };
        //? case with true product
      } else {
        return {
          statusCode: 200,
          body: JSON.stringify(product),
        };
      }
      //? case cannot fetch data
    } catch (error) {}
    return {
      headers: { "Access-Control-Allow-Origin": "*" },
      statusCode: 404,
      body: `No such product available ${id}`,
    };
  } else {
    //! if no id provided get all products
    try {
      const { records } = await airtable.list();

      //? make a new array with each products details
      const allProducts = records.map((product) => {
        const { id } = product;
        const { name, image, price } = product.fields;
        const url = image[0].url;

        return {
          id,
          name,
          url,
          price,
        };
      });
      //? return the new object with the product details
      return {
        headers: { "Access-Control-Allow-Origin": "*" },
        statusCode: 200,
        body: JSON.stringify(allProducts),
      };
    } catch (error) {
      return {
        headers: { "Access-Control-Allow-Origin": "*" },
        statusCode: 500,
        body: "SERVER ERROR (3-AIRTABLE-FUNCTION)",
      };
    }
  }
};
