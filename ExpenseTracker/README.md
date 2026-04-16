# Expense Tracker

A full-stack web application for tracking daily expenses with MongoDB integration.

## Features
- Add expenses with amount, category, and date
- Categorize expenses (Food, Travel, Bills, Entertainment, Health, Shopping, Other)
- View spending history
- Calculate total expenses
- Delete expense entries
- Real-time expense list updates

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
PORT=3002
MONGODB_URI=mongodb://localhost:27017/expensetracker
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expensetracker?retryWrites=true&w=majority
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

1. Open your browser and navigate to: `http://localhost:3002`
2. Fill in the expense form with:
   - Amount (required)
   - Category (required)
   - Date (optional, defaults to today)
3. Click "Add Expense"
4. View total expenses and spending history
5. Delete expenses with the Delete button

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /expenses | Get all expenses with total |
| POST | /expenses | Add an expense |
| DELETE | /expenses/:id | Delete an expense |

## Request/Response Examples

### Add Expense
```bash
curl -X POST http://localhost:3002/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50.00,
    "category": "Food",
    "date": "2024-01-15"
  }'
```

### Response
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "amount": 50.00,
  "category": "Food",
  "date": "2024-01-15T00:00:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Get All Expenses
```json
{
  "expenses": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "amount": 50.00,
      "category": "Food",
      "date": "2024-01-15T00:00:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 50.00
}
```

## Database Schema

```javascript
{
  amount: Number (required),
  category: String (required),
  date: Date,
  createdAt: Date
}
```

## Categories
- Food
- Travel
- Bills
- Entertainment
- Health
- Shopping
- Other

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
