import express, {Router} from 'express';
import {authorizePatient} from '../controllers/auth';
import {
  createPatient,
  deletePatient,
  getPatientByEmail,
  updatePatient,
} from '../controllers/patient';

const router: Router = express.Router();

router.post('/', createPatient);

router.get('/', getPatientByEmail);

router.put('/:id', updatePatient);

router.delete('/:id', deletePatient);

export {router};
