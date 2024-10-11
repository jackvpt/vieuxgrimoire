/** Imports */
require("dotenv").config() /** Load environnement variables from .env file to process.env */

const helmet = require("helmet")
const express = require("express")
const mongoose = require("mongoose")
const rateLimiter = require("./middleware/rate-limiter")
const path = require("path")
const booksRoutes = require("./routes/books")
const userRoutes = require("./routes/user")

/** Create an express application */
const app = express()

/** MongoDB database connection */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB connection success !")
  } catch (error) {
    console.log("MongoDB connection failed !")
  }
}

connectDB()

/** Middleware which intercepts all queries with JSON type and builds req.body (replaces body-parser) */
app.use(express.json())

/** Protect application by setting various HTTP headers (XSS, Clickjacking,...) but allowing images from 'same-site' */
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }))

/** Middleware for CORS headers */
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  ) /** All origins authorized */
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ) /** Some headers authorized */
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ) /** Some methods authorized */
  next() // Go to next middleware
})

/** User routes */
app.use("/api/auth", rateLimiter[1], userRoutes)

/** Books routes */
app.use("/api/books", rateLimiter[1], booksRoutes)

/** Static routes */
app.use(
  "/images",
  express.static(path.join(__dirname, "images"))
) /** Set image file local path */

module.exports = app
