import express, {Router} from 'express';
import {authenticatePatient} from '../controllers/auth';
import { createPatient } from '../controllers/patient';

const router: Router = express.Router();

// TODO: implement user auth controllers

// create patient acc
router.post('/patient', createPatient, authenticatePatient);

// login to patient
router.post('/patient/login', authenticatePatient);

// authorize test

// create dentist

export {router};
