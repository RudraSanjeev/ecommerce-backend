const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const authRoute = require("./routes/auth.route.js");

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
app.use(express.json());
app.use("/api/auth", authRoute);

// server
app.listen(PORT, () => {
  console.log(`Backend is running at port: ${PORT} `);
});
