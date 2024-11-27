import express, {Router} from 'express';
import { authorizePatient } from '../controllers/auth';
import { getPatientProfileByEmail } from '../controllers/patient';

const router: Router = express.Router();

router.use(authorizePatient);

router.get('/', getPatientProfileByEmail);

export {router};