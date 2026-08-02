require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectDB } = require('./src/config/db.config');
const routes = require('./src/routes');
const { errorHandler, notFound } = require('./src/middlewares/error.middleware');

// Initialize App
const app = express();

// Global Middlewares
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Allow cross-origin requests
app.use(helmet()); // Security headers
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Request logging
}

// Connect to Database
connectDB();

// API Routes
app.use('/api/v1', routes);

// Base route for easy checking
app.get('/', (req, res) => {
  res.send('EcoMargin Backend API is Running');
});

// 404 & Error Handling
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
