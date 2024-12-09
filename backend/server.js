import express from 'express';
import connectMongoDB from './db/connectToDB.js';
import cors from 'cors';
import docRoutes from './routes/doctors.routes.js';
import patientRoutes from './routes/patients.routes.js';
import appointmentRoutes from './routes/appointments.routes.js';

import path from 'path';


const app = express();
const PORT = 5000;

const __dirname = path.resolve();

// Connect to mongoDB
connectMongoDB();

app.use(cors()); //allow request from every Cors
app.use(express.json()); //used to get json payloads req. 

// Middle Ware
app.use('/doctors', docRoutes);
app.use('/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
});