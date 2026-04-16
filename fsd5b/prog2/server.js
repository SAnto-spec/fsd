// [server.js](http://_vscodecontentref_/2)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
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

connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// CREATE USER API
app.post("/addUser", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
      message: "User added successfully",
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding user",
      error: error.message
    });
  }
});

// GET ALL USERS API
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "Users fetched successfully",
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message
    });
  }
});

// GET USER BY ID API
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message
    });
  }
});

// UPDATE USER API
app.put("/updateUsers/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message
    });
  }
});

// DELETE USER API
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});