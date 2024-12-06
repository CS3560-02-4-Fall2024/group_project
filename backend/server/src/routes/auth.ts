import express, {Router} from 'express';
import {
  authenticatePatient,
  authenticateDentist,
} from '../controllers/auth';
import {createPatient, createDentist} from '../controllers/auth';

const router: Router = express.Router();

router.post('/patient/signup', createPatient, authenticatePatient);

router.post('/patient/login', authenticatePatient);

router.post('/dentist/signup', createDentist, authenticateDentist);

router.post('/dentist/login', authenticateDentist);

export {router};