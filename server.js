import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectMongoDB from './config/Database.js';
import Router from './routes/authRoutes.js';
import Router1 from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration to allow specific domains
app.use(cors({
    // credentials: true,
    // origin: process.env.ALLOWED_ORIGIN || '*', // Default to '*' if ALLOWED_ORIGIN is not set
}));

// Connect to MongoDB
connectMongoDB();

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World! Server is running...');
});

// Authentication and User routes
app.use('/auth', Router);  // Auth Routes
app.use('/users',Router1);  // User Routes

// Define PORT
const PORT = process.env.E_PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
