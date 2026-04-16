const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Student Information Server!');
});


app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('Name: Santo Xavier\nRoll No: 10699\nCourse: Computer Engineering');
});


app.get('/contact', (req, res) => {
    res.type('text/plain');
    res.send('Email: santoxavier@gmail.com\nPhone: +919970565948');
});


app.post('/register', (req, res) => {
    res.status(201).send('201: Student registered successfully');
});


app.put('/update', (req, res) => {
    res.status(200).send('200: Student record updated successfully');
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});