# Student Feedback System

A full-stack web application for collecting and managing student feedback for courses with MongoDB integration.

## Features
- Submit feedback with student name, course name, rating, and comments
- View all submitted feedback
- Rate courses on a 1-5 scale
- Add detailed comments
- Delete feedback entries
- Real-time feedback list updates

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- Postman (optional, for API testing)

## Installation

### 1. Clone or download the project

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env` and update with your settings:
```bash
PORT=3001
MONGODB_URI=mongodb://localhost:27017/studentfeedback
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studentfeedback?retryWrites=true&w=majority
```

### 4. Start the server
```bash
npm start
```

Or with auto-reload (requires nodemon):
```bash
npm run dev
```

## Usage

1. Open your browser and navigate to: `http://localhost:3001`
2. Fill in the feedback form with:
   - Student Name (required)
   - Course Name (required)
   - Rating 1-5 (required)
   - Comments (optional)
3. Click "Submit Feedback"
4. View all submitted feedback in the list below
5. Delete feedback entries with the Delete button

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /feedback | Get all feedback |
| POST | /feedback | Submit feedback |
| DELETE | /feedback/:id | Delete feedback |

## Request/Response Examples

### Submit Feedback
```bash
curl -X POST http://localhost:3001/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "John Doe",
    "courseName": "Full Stack Web Development",
    "rating": 5,
    "comments": "Excellent course with practical examples"
  }'
```

### Response
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "studentName": "John Doe",
  "courseName": "Full Stack Web Development",
  "rating": 5,
  "comments": "Excellent course with practical examples",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## Database Schema

```javascript
{
  studentName: String (required),
  courseName: String (required),
  rating: Number (1-5, required),
  comments: String,
  createdAt: Date
}
```

## Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (Fetch API)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Other**: CORS, Dotenv

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check your Atlas connection string
- Verify credentials and IP whitelist in MongoDB Atlas

### Port Already in Use
- Change the PORT in `.env` file to an available port

### CORS Error
- Ensure your frontend URL is correctly configured in CORS settings

## Author
Fr. Conceicao Rodrigues College of Engineering - Department of Computer Engineering
