import { getDoctors, addDoctors, updateDoctor, deleteDoctors } from '../controller/doctors.controller.js'
import express from 'express';

const router = express.Router();

router.get('/', getDoctors);

router.post('/add', addDoctors);

router.put('/update/:_id', updateDoctor)

router.delete('/delete/:_id', deleteDoctors);


export default router;