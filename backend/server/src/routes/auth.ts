import express, {Router} from 'express';
import { createNewPatient, authenticatePatient, authorizePatient } from '../controllers/auth';

const router: Router = express.Router();

// TODO: implement user auth controllers

// login to patient

// create patient acc
router.post('/patient', createNewPatient, authenticatePatient);

// login to dentist
router.post('/patient/login', authenticatePatient);

// authorize test
router.get('/patient', authorizePatient);

// create dentist

export {router};
