import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connectMongoDB = async () => {
    try {
        const mongoURL = process.env.MONGODB_URL;
        if (!mongoURL) {
            throw new Error("MONGODB_URL is not defined in the .env file.");
        }
        await mongoose.connect(mongoURL, {
            
        });
        console.log("MongoDB connected...");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectMongoDB;
