import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        uuid: {
            type: String,
            default: () => new mongoose.Types.ObjectId().toString(),
            required: true,
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [3, "Name must be at least 3 characters long"],
            maxlength: [100, "Name cannot exceed 100 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            validate: {
                validator: (email) => /^\S+@\S+\.\S+$/.test(email),
                message: "Invalid email format",
            },
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
        },
        role: {
            type: String,
            enum: ["user", "admin"], // Allowed roles
            default: "user", // Default role
            required: [true, "Role is required"],
        },
    },
    {
        timestamps: true, // Automatically manage `createdAt` and `updatedAt`
        collection: "users", // Specify MongoDB collection name
    }
);

// Middleware to hash the password before saving the user


// Create and export the MongoUser model
const MongoUser = mongoose.model("MongoUser", userSchema);

export default MongoUser;
