const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const { studentName, branch, year } = req.body;
    res.send(`
        <h3>Form Submitted Successfully!</h3>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Branch:</strong> ${branch}</p>
        <p><strong>Year:</strong> ${year}</p>
        <br>
        <a href="/">Go Back to Form</a>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});