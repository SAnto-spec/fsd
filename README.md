# Full-Stack Development (FSD) - Complete Learning Projects

This workspace contains 5 complete full-stack applications demonstrating MongoDB integration with Frontend and Backend components. Each project follows a three-tier architecture pattern.

## Project Overview

### 1. **Task Tracker System** 📋
- **Port**: 3000
- **Folder**: `TaskTracker/`
- **Purpose**: Manage daily tasks with status tracking
- **Key Features**: Create, update, delete tasks; set deadlines; track status
- **Database**: `tasktracker`

### 2. **Student Feedback System** ⭐
- **Port**: 3001
- **Folder**: `StudentFeedback/`
- **Purpose**: Collect and manage course feedback
- **Key Features**: Submit ratings (1-5), add comments, view all feedback
- **Database**: `studentfeedback`

### 3. **Expense Tracker** 💰
- **Port**: 3002
- **Folder**: `ExpenseTracker/`
- **Purpose**: Track daily expenses by category
- **Key Features**: Add expenses, categorize, view spending history, calculate total
- **Database**: `expensetracker`

### 4. **Product Inventory System** 📦
- **Port**: 3003
- **Folder**: `ProductInventory/`
- **Purpose**: Manage product inventory
- **Key Features**: Add products, track stock levels, update quantities
- **Database**: `productinventory`

### 5. **Event Registration System** 🎫
- **Port**: 3004
- **Folder**: `EventRegistration/`
- **Purpose**: Register users for events
- **Key Features**: User registration, unique email constraint, cancellations
- **Database**: `eventregistration`

## Architecture

Each project follows the same three-tier architecture:

```
┌─────────────────────────────────────────────┐
│             FRONTEND (UI)                    │
│  HTML5 + CSS3 + JavaScript (Fetch API)      │
└──────────────────┬──────────────────────────┘
                   │
                   │ HTTP/REST
                   │
┌──────────────────▼──────────────────────────┐
│         BACKEND (API Server)                 │
│    Node.js + Express.js                     │
│    CRUD Operations & Business Logic         │
└──────────────────┬──────────────────────────┘
                   │
                   │ Mongoose ODM
                   │
┌──────────────────▼──────────────────────────┐
│      DATABASE (MongoDB)                      │
│    Collections: Documents with Schema        │
└─────────────────────────────────────────────┘
```

## Prerequisites

Before starting any project, ensure you have:

- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **MongoDB** (Choose one):
  - Local MongoDB instance
  - MongoDB Atlas account (Cloud)
- **Code Editor**: VS Code or any preferred editor
- **Postman** (Optional, for API testing)

## Common Setup Instructions

### For Each Project:

1. **Navigate to project folder**
   ```bash
   cd TaskTracker  # or StudentFeedback, ExpenseTracker, etc.
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   # Copy example to .env
   copy .env.example .env
   
   # Edit .env with your settings
   # For local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/database_name
   
   # For MongoDB Atlas:
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
   ```

4. **Start server**
   ```bash
   npm start      # Start server normally
   npm run dev    # Start with auto-reload (requires nodemon)
   ```

5. **Open in browser**
   ```
   http://localhost:PORT
   ```

## Running All Projects Simultaneously

### Windows (Command Prompt)
```batch
@echo off
start "Task Tracker" cmd /k "cd TaskTracker && npm install && npm start"
start "Student Feedback" cmd /k "cd StudentFeedback && npm install && npm start"
start "Expense Tracker" cmd /k "cd ExpenseTracker && npm install && npm start"
start "Product Inventory" cmd /k "cd ProductInventory && npm install && npm start"
start "Event Registration" cmd /k "cd EventRegistration && npm install && npm start"
```

### macOS/Linux (Bash)
```bash
cd TaskTracker && npm install && npm start &
cd StudentFeedback && npm install && npm start &
cd ExpenseTracker && npm install && npm start &
cd ProductInventory && npm install && npm start &
cd EventRegistration && npm install && npm start &
```

## API Testing with Postman

### Import APIs
For each project, the API endpoints follow REST conventions:

**Task Tracker API Collection:**
- POST `/tasks` - Create task
- GET `/tasks` - Get all tasks
- PUT `/tasks/:id` - Update task
- DELETE `/tasks/:id` - Delete task

**Student Feedback API Collection:**
- POST `/feedback` - Submit feedback
- GET `/feedback` - Get all feedback
- DELETE `/feedback/:id` - Delete feedback

**Expense Tracker API Collection:**
- POST `/expenses` - Add expense
- GET `/expenses` - Get all expenses with total
- DELETE `/expenses/:id` - Delete expense

**Product Inventory API Collection:**
- POST `/products` - Add product
- GET `/products` - View all products
- PUT `/products/:id` - Update product
- DELETE `/products/:id` - Delete product

**Event Registration API Collection:**
- POST `/registrations` - Register user
- GET `/registrations` - View registrations
- DELETE `/registrations/:id` - Cancel registration

## Database Schemas

### Task Tracker
```javascript
{
  title: String,
  description: String,
  deadline: Date,
  status: String,
  createdAt: Date
}
```

### Student Feedback
```javascript
{
  studentName: String,
  courseName: String,
  rating: Number,
  comments: String,
  createdAt: Date
}
```

### Expense Tracker
```javascript
{
  amount: Number,
  category: String,
  date: Date,
  createdAt: Date
}
```

### Product Inventory
```javascript
{
  name: String,
  price: Number,
  quantity: Number,
  createdAt: Date
}
```

### Event Registration
```javascript
{
  name: String,
  email: String,
  eventName: String,
  createdAt: Date
}
```

## Technology Stack

### Frontend
- HTML5
- CSS3 (with gradients and Flexbox)
- JavaScript (ES6+)
- Fetch API

### Backend
- Node.js
- Express.js (Framework)
- Mongoose (ODM)
- CORS (Cross-Origin Resource Sharing)
- Dotenv (Environment variables)

### Database
- MongoDB
- Collections & Documents
- Indexes

## Common Issues & Solutions

### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:**
- For local MongoDB: Ensure MongoDB Server is running
- For Atlas: Check connection string and whitelist IP address

### 2. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:**
- Change PORT in `.env` file
- Or kill process using the port

### 3. CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Ensure backend has CORS middleware enabled
- Check frontend URL in CORS configuration

### 4. Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:**
- Run `npm install` to install dependencies
- Check if `package.json` exists

### 5. Duplicate Key Error (Event Registration)
```
MongoError: E11000 duplicate key error
```
**Solution:**
- Each email can only register once
- Use a different email address

## Development Best Practices

1. **Environment Variables**: Never commit `.env` files with sensitive data
2. **Error Handling**: Each project includes try-catch blocks
3. **Validation**: Input validation on both frontend and backend
4. **RESTful APIs**: All APIs follow REST conventions
5. **Database Indexes**: IDs are indexed for better performance

## Learning Objectives

By completing these projects, you will learn:

✅ Three-tier architecture design
✅ RESTful API development
✅ MongoDB document design and queries
✅ Frontend-Backend communication
✅ CRUD operations
✅ Error handling and validation
✅ Environment configuration
✅ Full-stack development workflow

## Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

## Instructor
**Fr. Conceicao Rodrigues College of Engineering**
Department of Computer Engineering
Father Agnel Ashram, Bandstand, Bandra-West, Mumbai-50

## Support

For issues or questions:
1. Check individual project README files
2. Review API documentation
3. Test endpoints with Postman
4. Check browser console for frontend errors
5. Check terminal for backend errors

---

**Happy Learning!** 🎉
