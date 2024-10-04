// Import express
const express = require('express');
const bodyParser = require("body-parser");

// Import mongoose
const mongoose = require('mongoose');

// Import path
const path = require("path");

// Import Books Routes
const booksRoutes = require('./routes/books');

// Import User Routes
const userRoutes = require('./routes/user');

// Import models
const Book = require('./models/Book');

// Create an express application
const app = express();

// MongoDB database connection
mongoose.connect("mongodb+srv://jackvpt:Koala241080@cluster0.go29j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware which intercepts all queries with JSON type and builds req.body (replaces body-parser)
app.use(express.json());

// Middleware for CORS headers 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // All origins authorized
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Some headers authorized
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Some methods authorized
  next(); // Go to next middleware
});


// User routes
app.use("/api/auth", userRoutes)

// Books routes
app.use('/api/books', booksRoutes);

// Static routes
app.use('/images', express.static(path.join(__dirname, 'images'))); // Set image file local path

module.exports = app;

