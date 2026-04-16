const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3004;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eventregistration';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Registration Schema
const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  eventName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Registration = mongoose.model('Registration', registrationSchema);

// Routes

// GET - View all registrations
app.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Register user for an event
app.post('/registrations', async (req, res) => {
  const registration = new Registration({
    name: req.body.name,
    email: req.body.email,
    eventName: req.body.eventName
  });

  try {
    const newRegistration = await registration.save();
    res.status(201).json(newRegistration);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already registered' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// DELETE - Cancel registration
app.delete('/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Event Registration Server is running on http://localhost:${PORT}`);
});
