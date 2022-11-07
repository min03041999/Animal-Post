// Importing express module
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();
require("dotenv").config();

const { v4: uuid } = require("uuid");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
    // cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    // Error character as . / - ....
    // cb(null, new Date().toISOString() + "-" + file.originalname);
    // cb(null, Date.now() + path.extname(file.originalname));
    cb(null, uuid() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
// app.use(express.json({ limit: "25mb" }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

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

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

// Establishing the port
const PORT = process.env.PORT || 8080;

// Executing the server on given port number

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log(err));
