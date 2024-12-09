import connectMongoDB from "./connectMongoDB.js";
import mongoose from "mongoose";

// Connect to MongoDB
connectMongoDB();

// Define the schema
const animalSchema = mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
});

// Define an instance method
animalSchema.methods.findSimilarTypes = function (cb) {
    return mongoose.model("Animal").find({ type: this.type }, cb);
};

// Create the model
const Animal = mongoose.model("Animal", animalSchema);

// Create instances of the model
const dog1 = new Animal({ name: "Woof", type: "dog" });
const dog2 = new Animal({ name: "Bark", type: "dog" });

// Save instances and then use the instance method
Promise.all([dog1.save(), dog2.save()])
    .then(() => {
        // Call the instance method on a saved document
        dog1.findSimilarTypes((err, dogs) => {
            if (err) {
                console.log("Error:", err.message);
            } else {
                console.log("Similar Animals:", dogs);
            }
        });
    })
    .catch((err) => console.log("Error saving animals:", err.message));
