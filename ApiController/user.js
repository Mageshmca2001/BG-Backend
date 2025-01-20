import MongoUser from "../models/UserModel.js";

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await MongoUser.find({}, "-password"); // Exclude passwords from response
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await MongoUser.findById(req.params.id, "-password"); // Exclude password
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await MongoUser.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const newUser = new MongoUser({ name, email, password, role });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// Update an existing user
const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        if (!name && !email && !role) {
            return res.status(400).json({ message: "At least one field is required to update" });
        }

        const updatedUser = await MongoUser.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true, // Ensure validations are applied
        });

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await MongoUser.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

// Export the user controller
const userController = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

export default userController;
