const express = require("express");
const app = express();
// dotenv
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// connect to database
const connectDB = require("./models/db");
connectDB();

// middleware
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());


// routes
const authRoutes = require("./routes/auth.router");
const productRoute = require('./routes/product.router')
app.use("/api/auth", authRoutes);
app.use('/api', productRoute);
app.listen(PORT, () => {
  console.log("server is running on the port ", PORT);
});
