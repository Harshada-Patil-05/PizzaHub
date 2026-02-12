// Import required packages
const path = require('path');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


// Load environment variables (DO NOT move .env)
dotenv.config();

// Import Configs and Middlewares
const connectDb = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');

// Import Routes
const adminUserRoutes = require('./routes/adminUserRoutes');
const userRoutes = require('./routes/userRoutes');
const pizzaRoutes = require('./routes/pizzaRoutes');
const orderRoutes = require('./routes/orderRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const sendTestEmail = require('./middlewares/nodemailerMiddleware');

// Create Express App
const app = express();

// Connect to Database
connectDb();
sendTestEmail();


// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('API is running successfully 🚀');
});

// API Routes
app.use('/api/admin', adminUserRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stocks', inventoryRoutes);

// Error Handling Middlewares (MUST be last)
app.use(notFound);
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
