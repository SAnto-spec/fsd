# Product Inventory System

A full-stack web application for managing product inventory with MongoDB integration.

## Features
- Add new products with name, price, and quantity
- View all products in inventory
- Update product quantities
- Delete products
- Stock status tracking (In Stock, Low Stock, Out of Stock)
- Real-time inventory updates

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
PORT=3003
MONGODB_URI=mongodb://localhost:27017/productinventory
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/productinventory?retryWrites=true&w=majority
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

1. Open your browser and navigate to: `http://localhost:3003`
2. Add a new product:
   - Enter Product Name (required)
   - Enter Price in $ (required)
   - Enter Quantity (required)
   - Click "Add Product"
3. View products in the inventory table
4. Update quantities using the input field and Update button
5. Delete products with the Delete button

## Stock Status
- **In Stock**: Quantity > 10
- **Low Stock**: Quantity between 1-10
- **Out of Stock**: Quantity = 0

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | View all products |
| POST | /products | Add a product |
| PUT | /products/:id | Update product |
| DELETE | /products/:id | Delete product |

## Request/Response Examples

### Add Product
```bash
curl -X POST http://localhost:3003/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 999.99,
    "quantity": 15
  }'
```

### Response
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop",
  "price": 999.99,
  "quantity": 15,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Update Product Quantity
```bash
curl -X PUT http://localhost:3003/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 12
  }'
```

## Database Schema

```javascript
{
  name: String (required),
  price: Number (required),
  quantity: Number (required, default: 0),
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
