import express, {Router} from 'express';
import {authorizeDentist} from '../controllers/auth';
import {createDentist, getDentistById} from '../controllers/dentist';

const router: Router = express.Router();

router.use(authorizeDentist);

router.post('/create', createDentist);

router.get('/', getDentistById);

export {router};
