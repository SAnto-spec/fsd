// server.js

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Import Model
const User = require("./models/User");

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Atlas Connected Successfully");
  } catch (error) {
    console.error("Connection Failed:", error.message);
    process.exit(1);
  }
};

// Call DB connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});