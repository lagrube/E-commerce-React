const express = require("express");
const bodyParser = require("body-parser");

// MongoDb + Dotenv
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes");

// Express
const app = express();

// Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRoutes);
// app.use("/api/post", postRoutes);

// Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
