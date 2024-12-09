import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test');
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error", error.message);
    }
};

export default connectMongoDB;
