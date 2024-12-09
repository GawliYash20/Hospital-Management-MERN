import Doctor from "../model/doctors.js";

export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        return res.status(200).json(doctors);
    } catch (error) {
        console.log("MessageError: ", error.message);
        return res.status(400).json({ error: "Error in getDoc-Controller" });
    }
};

export const addDoctors = async (req, res) => {
    try {
        const { name, speciality } = req.body;

        const foundUser = await Doctor.findOne({ name: { $regex: name, $options: 'i' } });
        if (foundUser) {
            return res.status(409).json({ error: "Doctor already exists" });
        }

        const newDoctor = new Doctor({ name, speciality });
        const savedDoctor = await newDoctor.save();
        return res.status(201).json(savedDoctor);

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: "Error in addDoc-Controller" });
    }
};

export const updateDoctor = async (req, res) => {
    try {
        const { name, speciality } = req.body;
        const doctor = await Doctor.findByIdAndUpdate(req.params._id, {
            $set: { name, speciality }
        }, { new: true });
        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        return res.status(200).json({ message: "Doctor updated successfully", doctor });
    } catch (error) {
        console.log("Error in updateDoctor: ", error.message);
        return res.status(400).json({ error: "Failed to update. See console" });
    }
};

export const deleteDoctors = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params._id);
        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        return res.status(200).json({ message: "Doctor successfully deleted" });
    } catch (err) {
        console.log("Error in deleteDoctor controller: ", err.message);
        return res.status(400).json({ error: err.message });
    }
};
