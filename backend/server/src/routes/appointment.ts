import express, {Router} from 'express';
import { bookAppointment } from '../controllers/appointment';
import { authorizePatient } from '../controllers/auth';

const router: Router = express.Router();

router.post('/', authorizePatient, bookAppointment);

export {router}