import express, {Router} from 'express';
import {authorizePatient} from '../controllers/auth';
import {
  createPatient,
  deletePatient,
  getPatientByEmail,
  getPatientById,
  updatePatient,
} from '../controllers/patient';

const router: Router = express.Router();

router.use('/:id', authorizePatient);

router.get('/:id', getPatientById);

router.put('/:id', updatePatient);

router.delete('/:id', deletePatient);

export {router};
