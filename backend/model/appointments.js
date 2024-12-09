import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
    {
        patientName: {
            type: String,
            required: true,
        },
        doctorName: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        }
    }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
