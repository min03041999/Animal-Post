// Importing express module
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const feedRoutes = require("./routes/feed");

app.use(bodyParser.json());

app.use("/feed", feedRoutes);

// Getting Request
app.get("/", (req, res) => {
  // Sending the response
  res.send("Hello World!");

  // Ending the response
  res.end();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-access-token");
  next();
});

// Establishing the port
const PORT = process.env.PORT || 5000;

// Executing the server on given port number

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log(err));
