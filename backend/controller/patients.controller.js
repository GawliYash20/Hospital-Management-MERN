import Patient from '../model/patients.js';

export const getPatients = async (req, res) => {
    try {
        const patient = await Patient.find();
        return res.status(200).json(patient);
    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(400).json({ error: "Error in getPatient-controller" });
    }
};

export const addPatients = async (req, res) => {
    try {
        const { name, age, gender } = req.body;
        const userFound = await Patient.findOne({ name: { $regex: name, $options: 'i' } });
        if (userFound) {
            return res.status(409).json("Patient already exists");
        }
        const newPatient = new Patient({ name, age, gender });
        await newPatient.save();
        return res.status(201).json("Patient successfully added");
    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(400).json({ error: "Error in addPatient-controller" });
    }
};

export const updatePatients = async (req, res) => {
    try {
        const { name, age, gender } = req.body;
        const patient = await Patient.findByIdAndUpdate(req.params._id, {
                $set: { name, age, gender }
            }, { new: true });
        if (!patient) {
            return res.status(409).json({ error: "Patient not found" });
        }
        return res.status(200).json({ message: "Patient updated successfully", patient });
    } catch (err) {
        console.log("Error: ", err.message);
        return res.status(400).json("Error in updatePatients controller");
    }
};

export const deletePatients = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params._id);
        if (!patient) {
            return res.status(409).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "Patient Deleted" });
    } catch (err) {
        console.log("Error: ", err.message);
        return res.status(400).json({ error: err.message });
    }
};
