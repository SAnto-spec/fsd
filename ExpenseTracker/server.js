const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expensetracker';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Expense Schema
const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

// Routes

// GET - Retrieve all expenses
app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    res.json({ expenses, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Add an expense
app.post('/expenses', async (req, res) => {
  const expense = new Expense({
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete an expense
app.delete('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Expense Tracker Server is running on http://localhost:${PORT}`);
});
