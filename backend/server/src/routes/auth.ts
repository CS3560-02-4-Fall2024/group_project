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

router.post('/patient', createPatient, authenticatePatient);

router.post('/patient/login', authorizePatient);

export {router};
