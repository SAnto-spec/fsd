const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tasktracker';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  deadline: Date,
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', taskSchema);

// Routes

// GET - Retrieve all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Create a new task
app.post('/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    deadline: req.body.deadline,
    status: req.body.status || 'Pending'
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Update a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.body.title) task.title = req.body.title;
    if (req.body.description) task.description = req.body.description;
    if (req.body.deadline) task.deadline = req.body.deadline;
    if (req.body.status) task.status = req.body.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Task Tracker Server is running on http://localhost:${PORT}`);
});
