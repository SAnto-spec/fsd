const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = 3000;


app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/profile', (req, res) => {
    res.render('profile', {
        name: "Santo Xavier",
        branch: "Computer Engineering",
        year: "SE"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});