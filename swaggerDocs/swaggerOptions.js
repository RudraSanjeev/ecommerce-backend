const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce",
      version: "1.0.0",
      description: "E-Commerce, node and express app",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./swaggerDocs/*.js"],
};

module.exports = options;
