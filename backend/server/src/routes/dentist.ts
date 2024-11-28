import express, {Router} from 'express';
import {authorizeDentist} from '../controllers/auth';
import {getDentistById} from '../controllers/dentist';

const router: Router = express.Router();

router.use(authorizeDentist);

router.get('/', getDentistById);

export {router};
