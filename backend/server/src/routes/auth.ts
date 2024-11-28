import express, {Router} from 'express';
import {authenticatePatient, authenticateDentist} from '../controllers/auth';
import { createPatient } from '../controllers/patient';
import {createDentist} from '../controllers/dentist';

const router: Router = express.Router();

// TODO: implement user auth controllers

// create patient acc
router.post('/patient', createPatient, authenticatePatient);

// login to patient
router.post('/patient/login', authenticatePatient);

// authorize test

// Create dentist acc
router.post('/dentist', createDentist, authenticateDentist);

// Login to dentist
router.post('/dentist/login', authenticateDentist);

export {router};
