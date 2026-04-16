const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/studentfeedback';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comments: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Routes

// GET - Retrieve all feedback
app.get('/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Submit feedback
app.post('/feedback', async (req, res) => {
  const feedback = new Feedback({
    studentName: req.body.studentName,
    courseName: req.body.courseName,
    rating: req.body.rating,
    comments: req.body.comments
  });

  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete feedback
app.delete('/feedback/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Student Feedback Server is running on http://localhost:${PORT}`);
});
