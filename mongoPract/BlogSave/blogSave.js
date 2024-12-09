import mongoose from "mongoose";
import Blog from "./blogModel.js";

const sampleBlogs = [
    {
        title: "Understanding JavaScript Closures",
        author: "John Doe",
        body: "A closure is the combination of a function bundled together with references to its surrounding state.",
        comments: [
            { body: "Great explanation!", date: new Date("2024-11-20") },
            { body: "Helped me a lot, thanks!", date: new Date("2024-11-21") }
        ],
        hidden: false,
        meta: { votes: 42, favs: 10 }
    },
    {
        title: "Introduction to MongoDB",
        author: "Jane Smith",
        body: "MongoDB is a NoSQL database that uses JSON-like documents to store data.",
        comments: [
            { body: "This is very helpful, thanks!", date: new Date("2024-11-22") }
        ],
        hidden: false,
        meta: { votes: 35, favs: 8 }
    },
    {
        title: "Exploring Node.js Event Loop",
        author: "Alice Johnson",
        body: "The event loop allows Node.js to perform non-blocking I/O operations.",
        comments: [
            { body: "I never understood the event loop until now!", date: new Date("2024-11-23") },
            { body: "Concise and to the point.", date: new Date("2024-11-24") }
        ],
        hidden: true,
        meta: { votes: 25, favs: 5 }
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/test');

        await Blog.insertMany(sampleBlogs);
        console.log("Sample blogs inserted succesfuly!")
        mongoose.disconnect();
    } catch (error) {
        console.log("Error", error.message);
        mongoose.disconnect();
    }
}

seedDatabase();