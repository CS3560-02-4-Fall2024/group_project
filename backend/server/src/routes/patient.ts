import express, {Router} from 'express';
import {authorizePatient} from '../controllers/auth';
import {
  deletePatient,
  getPatientById,
  updatePatient,
} from '../controllers/patient';

const router: Router = express.Router();

router.use(authorizePatient);

router.get('/:id', getPatientById);

router.put('/:id', updatePatient);

router.delete('/:id', deletePatient);

export {router};
