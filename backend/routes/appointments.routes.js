import express from 'express';
import {getAppointments, addAppointment, updateAppointment, deleteAppointment} from '../controller/appointment.controller.js'

const router = express.Router();

router.get('/', getAppointments);

router.post('/add', addAppointment);

router.put('/update/:_id', updateAppointment);

router.delete('/delete/:_id', deleteAppointment);

export default router;