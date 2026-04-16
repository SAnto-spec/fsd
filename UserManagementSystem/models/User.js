const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    age: {
      type: Number,
      min: [0, "Age cannot be less than 0"],
      max: [120, "Age cannot be greater than 120"]
    },
    hobbies: {
      type: [String],
      default: []
    },
    bio: {
      type: String,
      trim: true,
      default: ""
    },
    userId: {
      type: String,
      required: [true, "User ID is required"],
      unique: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 60 * 60 * 24 * 365 }
    }
  },
  {
    timestamps: false
  }
);

userSchema.index({ userId: "hashed" });
userSchema.index({ bio: "text", name: "text", email: "text" });

module.exports = mongoose.model("User", userSchema);