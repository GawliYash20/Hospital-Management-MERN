import mongoose from "mongoose";

function connectMongoDB() {
    try {
        mongoose.connect('mongodb://localhost:27017/test')
    } catch (error) {
        console.log("Error", error.message)
    }
}

export default connectMongoDB;