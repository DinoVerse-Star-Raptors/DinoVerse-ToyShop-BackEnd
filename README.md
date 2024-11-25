# DinoVerse-ToyShop-BackEnd

A comprehensive `README.md` for your Node.js eCommerce project with MongoDB Atlas setup:

---

# eCommerce Backend - Node.js API

This is the backend for an eCommerce application built with **Node.js**, **Express**, and **MongoDB Atlas**. It provides an API for handling users, products, cart, and orders in an eCommerce system.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [License](#license)

---

## Prerequisites

To run this project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for cloud database setup
- [Postman](https://www.postman.com/) or any other API testing tool (optional for testing API endpoints)

---

## Installation

### 1. Clone the repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/yourusername/ecommerce-backend.git
cd ecommerce-backend
```

### 2. Install dependencies

Install the necessary npm dependencies:

```bash
npm install
```

---

## Project Structure

Here’s a breakdown of the project structure:

```
/ecommerce-backend
│
├── /controllers            # Controller files for handling business logic (auth, cart, products, orders)
│   ├── authController.js   # Handles user authentication
│   ├── cartController.js   # Handles cart operations
│   ├── productController.js # Handles product operations
│
├── /middleware             # Middleware functions for authentication and error handling
│   ├── authMiddleware.js   # Auth middleware to protect routes
│   └── errorMiddleware.js  # Error handling middleware
│
├── /models                 # MongoDB Mongoose models for the application's entities
│   ├── User.js             # User model (for users)
│   ├── Product.js          # Product model (for products in the store)
│   ├── Cart.js             # Cart model (for user cart data)
│   └── Order.js            # Order model (for user orders)
│
├── /routes                 # Route files for defining API endpoints
│   ├── auth.js             # Routes for user authentication (login, signup)
│   ├── cart.js             # Routes for cart operations (add, remove, update)
│   ├── product.js          # Routes for managing products
│   └── order.js            # Routes for managing orders
│
├── /config                 # Configuration files (for MongoDB connection)
│   └── db.js               # MongoDB connection setup
│
├── .env                    # Environment variables (database URI, secret keys)
├── server.js               # Entry point to start the application
└── package.json            # Project dependencies and scripts
```

---

## MongoDB Atlas Setup

MongoDB Atlas provides a fully-managed, cloud-hosted MongoDB service.

### Steps to set up MongoDB Atlas:

1. **Sign Up / Log in**: Create an account or log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. **Create a Cluster**:
   - Click on "Build a Cluster".
   - Select the free-tier (M0 Cluster) and choose a cloud provider and region.
3. **Whitelist Your IP**:

   - Go to "Network Access" > "IP Whitelist".
   - Add your current IP address or allow all IPs (not recommended for production).

4. **Create a Database User**:

   - Go to "Database Access".
   - Create a new user with read/write access to your database and note down the credentials.

5. **Get Connection String**:
   - Go to "Clusters" > "Connect" > "Connect your application".
   - Copy the connection string for Node.js and replace `<username>`, `<password>`, and `<dbname>` with your actual MongoDB Atlas credentials.

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority
PORT=5000  # Optional: specify the port for the server
```

- Replace `<username>` and `<password>` with your MongoDB Atlas credentials.
- Replace `ecommerce` with the name of the database you want to use.
- You can also add other environment variables like JWT secrets, API keys, etc.

---

## API Endpoints

The API has the following routes:

### Authentication Routes

- **POST** `/api/auth/register` – Register a new user
- **POST** `/api/auth/login` – Login an existing user

### Product Routes

- **GET** `/api/products` – Get all products
- **GET** `/api/products/:id` – Get a single product by ID
- **POST** `/api/products` – Add a new product (Admin only)
- **PUT** `/api/products/:id` – Update a product (Admin only)
- **DELETE** `/api/products/:id` – Delete a product (Admin only)

### Cart Routes

- **GET** `/api/cart` – Get the user’s cart
- **POST** `/api/cart/add` – Add an item to the cart
- **POST** `/api/cart/remove` – Remove an item from the cart
- **POST** `/api/cart/checkout` – Checkout cart and place an order

### Order Routes

- **GET** `/api/orders` – Get user orders
- **POST** `/api/orders` – Place a new order

---

## Testing

You can use **Postman** or another API testing tool to test the API endpoints.

### Example: Register a new user (POST request)

1. Open Postman and create a **POST** request to `http://localhost:5000/api/auth/register`.
2. In the request body (JSON format), send the following:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

If the request is successful, you should receive a response like:

```json
{
  "message": "User created successfully",
  "user": {
    "username": "john_doe",
    "email": "john@example.com",
    "_id": "60e6f7f81f4f5c001f6ad835"
  }
}
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Conclusion

You now have a fully-functional eCommerce backend that connects to **MongoDB Atlas**, allowing users to register, login, manage products, add items to a cart, and place orders. You can expand this project by adding features such as payment gateways, order status updates, and more.
