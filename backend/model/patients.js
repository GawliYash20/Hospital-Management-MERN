import mongoose from "mongoose";

const patientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        }
    }
)

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;