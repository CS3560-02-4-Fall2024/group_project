import express, {Router} from 'express';
import {authorizePatient} from '../controllers/auth';
import {
  getPatientAppt,
  getPatientByEmail,
  postAppt,
} from '../controllers/patient';

const router: Router = express.Router();

router.use(authorizePatient);

router.get('/', getPatientByEmail);

router.get('/getAppts', getPatientAppt);

router.post('/makeAppt', postAppt);

export {router};
