// user.js
const mongoose = require('mongoose');


// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Additional fields for indexing strategies
  hobbies: [String],   // For multikey index
  userId: String,      // For hashed index
  bio: String          // For text search
});


// --- Indexes ---


// 1. Single field index
userSchema.index({ name: 1 });


// 2. Compound index
userSchema.index({ email: 1, age: -1 });


// 3. TTL index (auto-delete after 1 hour)
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });


// 4. Text index for full-text search
userSchema.index({ name: 'text', email: 'text', bio: 'text' });


// 5. Multikey index
userSchema.index({ hobbies: 1 });


// 6. Hashed index
userSchema.index({ userId: 'hashed' });


// Create the User model
const User = mongoose.model('User', userSchema);


// Export the model
module.exports = User;

