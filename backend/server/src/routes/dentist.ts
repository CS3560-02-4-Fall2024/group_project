import express, {Router} from 'express';
import {authorizeDentist} from '../controllers/auth';
import {
  deleteDentist,
  getDentistById,
  getDentists,
  updateDentist,
} from '../controllers/dentist';
import { getAppointments } from '../controllers/appointment';

const router: Router = express.Router();

router.get('/appointments', authorizeDentist, getAppointments);

router.get('/:id', getDentistById);

router.get('', getDentists);

router.put('/:id', authorizeDentist, updateDentist);

router.delete('/:id', authorizeDentist, deleteDentist);

export {router};
