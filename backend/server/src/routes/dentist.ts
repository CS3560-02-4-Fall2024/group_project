import express, {Router} from 'express';
import {authorizeDentist} from '../controllers/auth';
import {
  deleteDentist,
  getDentistById,
  updateDentist,
} from '../controllers/dentist';
import { getAppointments } from '../controllers/appointment';

const router: Router = express.Router();

router.use(authorizeDentist);

router.get('/appointments', getAppointments);

router.get('/:id', getDentistById);

router.put('/:id', updateDentist);

router.delete('/:id', deleteDentist);

export {router};
