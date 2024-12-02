import express, {Router} from 'express';
import {authorizeDentist} from '../controllers/auth';
import {
  createDentist,
  getBofa,
  getDentistAppts,
  getDentistById,
  getPatientById,
  getScheduled,
} from '../controllers/dentist';

const router: Router = express.Router();

router.use(authorizeDentist);

router.post('/create', createDentist);

router.get('/', getDentistById);

router.get('/getUpcoming', getDentistAppts);

router.get('/getDone', getScheduled);

router.get('/getPatientById', getPatientById);

router.get('/getBofa', getBofa);

export {router};
