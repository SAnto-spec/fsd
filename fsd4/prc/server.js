const express = require("express");
const morgan = require("morgan");
const path = require("path");
 
const app = express();
const PORT = 3000;
 
// ─── Middleware ───────────────────────────────────────────────────────────────
 
// Morgan: logs every request to the console
app.use(morgan("dev"));
 
// Serve static files from /public (for Post-Lab Exercise 1 HTML form)
app.use(express.static(path.join(__dirname, "public")));
 
// Parse URL-encoded form data (for Post-Lab Exercise 1)
app.use(express.urlencoded({ extended: true }));
 
// Parse JSON bodies
app.use(express.json());
 
// Set EJS as the view engine (for Post-Lab Exercise 2)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
 
// ─── Lab Routes ───────────────────────────────────────────────────────────────
 
// GET /  →  Welcome message
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the Student Information Server</h1>
    <p>Use the routes below to explore:</p>
    <ul>
      <li><a href="/about">GET /about</a> – Student details</li>
      <li><a href="/contact">GET /contact</a> – Contact info</li>
      <li><a href="/form">POST form demo</a> – Form handling</li>
      <li><a href="/profile">GET /profile</a> – EJS dynamic profile</li>
    </ul>
  `);
});
 
// GET /about  →  Student name, roll number, course
app.get("/about", (req, res) => {
  res.send(`
    <h2>About</h2>
    <p><strong>Name:</strong> John Doe</p>
    <p><strong>Roll No:</strong> 23</p>
    <p><strong>Course:</strong> Computer Engineering</p>
  `);
});
 
// GET /contact  →  Email / contact info
app.get("/contact", (req, res) => {
  res.send(`
    <h2>Contact</h2>
    <p><strong>Email:</strong> johndoe@example.com</p>
    <p><strong>Phone:</strong> +91 98765 43210</p>
  `);
});
 
// POST /register  →  201 Created
app.post("/register", (req, res) => {
  res.status(201).json({
    status: 201,
    message: "Student registered successfully.",
    data: req.body,
  });
});
 
// PUT /update  →  200 Updated
app.put("/update", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Student record updated successfully.",
    data: req.body,
  });
});