import express, {Router} from 'express';
import {authorizePatient} from '../controllers/auth';
import {getPatientByEmail} from '../controllers/patient';

const router: Router = express.Router();

router.use(authorizePatient);

router.get('/', getPatientByEmail);

export {router};
