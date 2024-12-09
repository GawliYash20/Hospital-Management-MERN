import Appointment from '../model/appointments.js';

export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        // if (!appointments.length) {
        //     return res.status(404).json({ error: "Appointments not found." });
        // }
        return res.status(200).json(appointments);
    } catch (err) {
        console.log("Error: ", err.message);
        return res.status(400).json({ error: "Error in getAppointment-controller" });
    }
};

export const addAppointment = async (req, res) => {
    try {
        const { patientName, doctorName, date } = req.body;
        const newAppointment = new Appointment({ patientName, doctorName, date });
        await newAppointment.save();
        return res.status(201).json(newAppointment);
    } catch (err) {
        console.log("Error: ", err.message);
        return res.status(400).json({ error: "Error in addAppointment-controller" });
    }
};

export const updateAppointment = async (req, res) => {
    try {
        const { patientName, doctorName, date } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(req.params._id,
            { $set: { patientName, doctorName, date } },
            { new: true });
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        return res.status(200).json(appointment);
    } catch (err) {
        console.log("Error: ", err.message);
        return res.status(400).json({ error: "Error in updateAppointment-controller" });
    }
};

export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params._id);
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        return res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
        console.log("Error: ", err.message);
        return res.status(400).json({ error: "Error in deleteAppointment-controller" });
    }
};
