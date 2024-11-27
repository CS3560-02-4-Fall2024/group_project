import express, {Router} from 'express';
import {
  createNewPatient,
  authenticatePatient,
} from '../controllers/auth';

const router: Router = express.Router();

// TODO: implement user auth controllers

// create patient acc
router.post('/patient', createNewPatient, authenticatePatient);

// login to patient
router.post('/patient/login', authenticatePatient);

// authorize test

// create dentist

export {router};
