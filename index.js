const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const authRoute = require("./routes/auth.route.js");
const productRoute = require("./routes/product.routes.js");
const cartRoute = require("./routes/cart.route.js");
const wishlistRoute = require("./routes/wishlist.route.js");
const orderRoute = require("./routes/order.route.js");
const addressRoute = require("./routes/address.route.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = require("./swaggerDocs/swaggerOptions.js");
const specs = swaggerJsDoc(options);

const app = express();
dotenv.config();
// utils
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

// db connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("db connected successfully..."))
  .catch((err) => console.error("db connection failed: " + err));

// middleware
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/wishlists", wishlistRoute);
app.use("/api/orders", orderRoute);
app.use("/api/address", addressRoute);
app.use((req, res) => {
  res.status(404).json("page not found !");
});
// server
const server = app.listen(PORT, () => {
  console.log(`Backend is running at port: ${PORT} `);
});

module.exports = server;
