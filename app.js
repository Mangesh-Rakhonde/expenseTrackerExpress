const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Route imports

const userRoutes = require('./routes/userRoute');
const expenseRoutes = require('./routes/expenseRoute');
const authRoter=require('./routes/auth');

const app = express();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials to be sent
}));
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests

// Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/expenses', expenseRoutes); // Expense-related routes
app.use('/auth',authRoter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
