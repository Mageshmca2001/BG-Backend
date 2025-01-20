import jwt from "jsonwebtoken";
import MongoUser from "../models/UserModel.js";

const authMiddleware = {
    // Middleware to verify the user
    verifyUser: async (req, res, next) => {
        try {
            // Get the token from the Authorization header
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ msg: "Please log in to your account!" });
            }

            // Extract the token
            const token = authHeader.split(" ")[1];
            if (!token) {
                return res.status(401).json({ msg: "Invalid token format" });
            }

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await MongoUser.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            // Attach user details to the request
            req.userId = user._id;
            req.role = user.role;

            next();
        } catch (error) {
            return res.status(403).json({ msg: "Invalid or expired token", error: error.message });
        }
    },

    // Middleware for admin-only access
    adminOnly: (req, res, next) => {
        if (req.role !== "admin") {
            return res.status(403).json({ msg: "Access forbidden: Admins only" });
        }
        next();
    }
};

export default authMiddleware;
