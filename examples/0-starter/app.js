//  Acces http://localhost:8888/.netlify/functions/0-starter
exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: "Our first netlify function example"
    };
};