import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        speciality: {
            type: String,
            required: true,
        }
    }
)

const Doctor = mongoose.model('Doctors', doctorSchema);


export default Doctor;