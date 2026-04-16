# Task Tracker System

A full-stack web application for managing daily tasks with MongoDB integration.

## Features
- Create, view, update, and delete tasks
- Track task status (Pending/Completed)
- Set deadlines for tasks
- Add descriptions to tasks
- Real-time task list updates

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
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tasktracker
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tasktracker?retryWrites=true&w=majority
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

1. Open your browser and navigate to: `http://localhost:3000`
2. Fill in the task form with:
   - Task Title (required)
   - Description (optional)
   - Deadline (optional)
   - Status (Pending/Completed)
3. Click "Add Task" to create a new task
4. View all tasks in the list below
5. Update task status using the dropdown
6. Delete tasks with the Delete button

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks |
| POST | /tasks | Create a new task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## Request/Response Examples

### Create a Task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the full-stack application",
    "deadline": "2024-12-31",
    "status": "Pending"
  }'
```

### Response
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete project",
  "description": "Finish the full-stack application",
  "deadline": "2024-12-31T00:00:00.000Z",
  "status": "Pending",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## Database Schema

```javascript
{
  title: String (required),
  description: String,
  deadline: Date,
  status: String (Pending/Completed),
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
