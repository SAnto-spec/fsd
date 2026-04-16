# Event Registration System

A full-stack web application for registering users for events with MongoDB integration.

## Features
- Register users for events with name, email, and event name
- Unique email constraint (one registration per email)
- View all registered participants
- Cancel registrations
- Track total registrations
- Real-time registration updates

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
PORT=3004
MONGODB_URI=mongodb://localhost:27017/eventregistration
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eventregistration?retryWrites=true&w=majority
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

1. Open your browser and navigate to: `http://localhost:3004`
2. Fill in the registration form with:
   - Name (required)
   - Email (required, must be unique)
   - Event Name (required)
3. Click "Register"
4. View all registered participants
5. Cancel registrations using the Cancel button

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /registrations | View all registrations |
| POST | /registrations | Register user for event |
| DELETE | /registrations/:id | Cancel registration |

## Request/Response Examples

### Register User
```bash
curl -X POST http://localhost:3004/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "eventName": "Annual Tech Conference 2024"
  }'
```

### Response
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "eventName": "Annual Tech Conference 2024",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Duplicate Email Error
```json
{
  "message": "Email already registered"
}
```

## Database Schema

```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  eventName: String (required),
  createdAt: Date
}
```

## Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (Fetch API)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Other**: CORS, Dotenv

## Constraints
- **Email**: Unique field - only one registration per email address
- **Lowercase**: Email addresses are automatically converted to lowercase

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check your Atlas connection string
- Verify credentials and IP whitelist in MongoDB Atlas

### Port Already in Use
- Change the PORT in `.env` file to an available port

### CORS Error
- Ensure your frontend URL is correctly configured in CORS settings

### Email Already Registered Error
- Each email can only register once. Use a different email address.

## Author
Fr. Conceicao Rodrigues College of Engineering - Department of Computer Engineering
