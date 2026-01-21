# 🛒 E-Commerce Platform

A modern full-stack e-commerce application built with the MERN stack, Redux for state management, and Tailwind CSS for styling.

## 🚀 Tech Stack

- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: Redux
- **Styling**: Tailwind CSS

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Ecommerce-MERN-Redux-Tailwindcss
```

### 2. Backend Setup

```bash
cd server
yarn install
```

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Start the backend server:

```bash
yarn start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
yarn install
```

Create a `.env` file in the `client` directory:

```bash
cp .env.example .env
```

Update the `.env` file with your API URL:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

Start the frontend development server:

```bash
yarn start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── data/          # Redux store and reducers
│   │   ├── helpers/       # Utility functions
│   │   ├── screens/       # Page components
│   │   └── assets/        # CSS and images
│   └── package.json
├── server/                # Backend Node.js application
│   ├── config/           # Database configuration
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── server.js         # Entry point
└── README.md
```

## 🔧 Features

- **User Authentication**: Register and login functionality
- **Product Management**: Create, read, update, and delete products
- **Category Management**: Organize products by categories
- **Admin Panel**: Admin-specific routes and middleware
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **State Management**: Redux for global state management

## 📡 API Endpoints

### Authentication

- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login user

### Categories

- `POST /api/category/` - Create category (Admin)
- `GET /api/category/` - Get all categories
- `GET /api/category/:id` - Get category by ID
- `PUT /api/category/:id` - Update category (Admin)
- `DELETE /api/category/:id` - Delete category (Admin)

### Products

- `POST /api/product/` - Create product (Admin)
- `GET /api/product/` - Get all products
- `GET /api/product/:id` - Get product by ID
- `PUT /api/product/:id` - Update product (Admin)
- `DELETE /api/product/:id` - Delete product (Admin)

## 🔐 Environment Variables

### Backend (.env)

- `PORT` - Server port (default: 5000)
- `MONGO_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)

- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_ENV` - Environment (development/production)

## 🧪 Testing

To test the application:

1. Start the backend server
2. Start the frontend server
3. Open `http://localhost:3000` in your browser
4. Register a new account
5. Login and explore the features

## 📝 License

This project is open source and available under the MIT License.
