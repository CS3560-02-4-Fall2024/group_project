import express, {Router} from 'express';
import {authorizePatient} from '../controllers/auth';
import { getAvailabilityByPatientEmail } from '../controllers/availability';

const router: Router = express.Router();

router.use(authorizePatient);

router.get('/patients', getAvailabilityByPatientEmail);

export {router};
