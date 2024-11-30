import express, {Router} from 'express';
import {
  authenticatePatient,
  authorizePatient,
  authenticateDentist,
  authorizeDentist,
} from '../controllers/auth';
import {createPatient} from '../controllers/patient';
import {createDentist} from '../controllers/dentist';

const router: Router = express.Router();

// create patient acc
router.post('/patient', createPatient, authenticatePatient);

// login to patient
router.post('/patient/login', authenticatePatient);

// authorize patient
router.get('/patient/authorize', authorizePatient, (req, res) => {
  res.sendStatus(200);
});

// Create dentist acc
router.post('/dentist', createDentist, authenticateDentist);

// Login to dentist
router.post('/dentist/login', authenticateDentist);

// authorize dentist
router.get('/dentist/authorize', authorizeDentist, (req, res) => {
  res.sendStatus(200);
});

export {router};
