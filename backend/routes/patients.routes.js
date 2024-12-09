import {getPatients, addPatients, updatePatients, deletePatients} from '../controller/patients.controller.js';

import express from 'express'

const router = express.Router();

router.get('/', getPatients);

router.post('/add', addPatients);

router.put('/update/:_id', updatePatients);

router.delete('/delete/:_id', deletePatients);

export default router;