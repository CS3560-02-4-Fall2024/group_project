import express, {Router} from 'express';
import {authorizePatient} from '../controllers/auth';
import {createPatient, getPatientByEmail} from '../controllers/patient';

const router: Router = express.Router();

router.use(authorizePatient);

router.get('/', getPatientByEmail);

// might needa fix cuz i didnt actualy do it
router.put('/addPatient', createPatient);

export {router};
