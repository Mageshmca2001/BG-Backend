import express from 'express';
import  auth  from '../Apicontroller/auth.js';

const router = express.Router();

// Register a new user
router.post('/register', auth.register);

// Log in an existing user
router.post('/login', auth.login);

// Get user details (protected route)
router.get('/details', auth.getUserDetails);


router.post('/logout', auth.logout); // Add logout route

export default router;
