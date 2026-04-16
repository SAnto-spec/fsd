# User Management System

A simple Node.js + MongoDB application with a basic frontend for managing users.

## Features
- Add new user
- View all users
- Update user details
- Delete user
- Search users by bio, name, or email

## Folder Structure
- `server.js` - Express backend and API routes
- `models/User.js` - Mongoose schema and validation
- `public/` - Frontend UI

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

3. Run the app:
   ```bash
   npm start
   ```

4. Open:
   ```
   http://localhost:3000
   ```

## API Routes
- `POST /api/users` - Create user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/search?q=value` - Search users
