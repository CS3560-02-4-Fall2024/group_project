import express, {Router} from 'express';
import { bookAppointment, cancelAppointment } from '../controllers/appointment';
import { authorizePatient } from '../controllers/auth';

const router: Router = express.Router();

router.post('/', authorizePatient, bookAppointment);

router.delete('/:appointmentId', authorizePatient, cancelAppointment);
export {router}