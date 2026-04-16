// server.js


require('dotenv').config(); // Load environment variables
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


// MongoDB Connection
const uri = process.env.MONGO_URI; // MongoDB URI from environment
const client = new MongoClient(uri);
let db;


async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME || 'myapp');
    console.log(`Connected to MongoDB database: ${process.env.DB_NAME || 'myapp'}`);


    const users = db.collection('users');


    // --- Index Strategies ---


    await users.createIndex({ name: 1 }); // Single field
    await users.createIndex({ email: 1, age: -1 }); // Compound
    await users.createIndex({ hobbies: 1 }); // Multikey
    await users.createIndex({ bio: 'text' }); // Text
    await users.createIndex({ userId: 'hashed' }); // Hashed
    await users.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 }); // TTL


    console.log('All indexes created successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}


// --- Routes ---


app.post('/users', async (req, res) => {
  try {
    const user = { ...req.body, createdAt: new Date() };
    const result = await db.collection('users').insertOne(user);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/users', async (req, res) => {
  try {
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/users/search', async (req, res) => {
  try {
    const { name } = req.query;
    const users = await db.collection('users').find({ name }).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/users/filter', async (req, res) => {
  try {
    const { email, age } = req.query;
    const query = {};
    if (email) query.email = email;
    if (age) query.age = parseInt(age);
    const users = await db.collection('users').find(query).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/users/hobbies', async (req, res) => {
  try {
    const { hobby } = req.query;
    const users = await db.collection('users').find({ hobbies: hobby }).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/users/textsearch', async (req, res) => {
  try {
    const { q } = req.query;
    const users = await db.collection('users').find({ $text: { $search: q } }).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/users/byid', async (req, res) => {
  try {
    const { userId } = req.query;
    const users = await db.collection('users').find({ userId }).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

