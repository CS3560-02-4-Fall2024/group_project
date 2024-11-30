import express, {Router} from 'express';
import {authorizePatient} from '../controllers/auth';
import {
  getPatientAppt,
  getPatientByEmail,
  postAppt,
  cancelAppt,
  getPastAppts,
  getDentistByType
} from '../controllers/patient';

const router: Router = express.Router();

router.use(authorizePatient);

router.get('/', getPatientByEmail);

router.get('/getAppts', getPatientAppt);

router.post('/makeAppt', postAppt);

router.delete('/cancelAppt', cancelAppt);

router.get('/getPastAppts', getPastAppts);

router.post('/getDentistByType', getDentistByType);

export {router};