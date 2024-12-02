import express, {Router} from 'express';
import {authorizePatient} from '../controllers/auth';
import {
  getPatientAppt,
  getPatientByEmail,
  postAppt,
  cancelAppt,
  getPastAppts,
  getDentistByType,
  getAvailabilities,
  getDentistByName,
  getIdAndDate,
} from '../controllers/patient';

const router: Router = express.Router();

router.use(authorizePatient);

router.get('/', getPatientByEmail);

router.get('/getAppts', getPatientAppt);

router.post('/makeAppt', postAppt);

router.put('/cancelAppt', cancelAppt);

router.get('/getPastAppts', getPastAppts);

router.get('/getDentistByType', getDentistByType);

router.get('/getAvailabilities', getAvailabilities);

router.get('/getDentistByName', getDentistByName);

router.get('/getIdAndDate', getIdAndDate);

export {router};
