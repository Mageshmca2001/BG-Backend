import express from 'express';
import userController from '../Apicontroller/user.js';
import authMiddleware   from '../middleware/AuthUser.js';

const router1 = express.Router();

// Get all users (Admin-only route)
router1.get('/', authMiddleware.verifyUser, authMiddleware.adminOnly,userController.getUsers);

// Get a specific user by ID (Admin-only route)
router1.get('/:id', authMiddleware.verifyUser, authMiddleware.adminOnly, userController.getUserById);

// Create a new user (Admin-only route)
router1.post('/', authMiddleware.verifyUser, authMiddleware.adminOnly, userController.createUser);

// Update an existing user (Admin-only route)
router1.patch('/:id', authMiddleware.verifyUser, authMiddleware.adminOnly,userController. updateUser);

// Delete a user (Admin-only route)
router1.delete('/:id', authMiddleware.verifyUser, authMiddleware.adminOnly, userController.deleteUser);

export default router1;
