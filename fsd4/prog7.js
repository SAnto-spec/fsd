import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>FSD Lab</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>FE CEB</h1><p>Course Instructor is Joshua</p>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact Me</h1><p>email: joshua.michael@fragnel.edu.in</p>");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});