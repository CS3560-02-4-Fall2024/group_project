import express, {Router} from 'express';
import {authorizeDentist} from '../controllers/auth';
import {
  deleteDentist,
  getDentistById,
  updateDentist,
} from '../controllers/dentist';

const router: Router = express.Router();

router.use('/:id', authorizeDentist);

router.get('/:id', getDentistById);

router.put('/:id', updateDentist);

router.delete('/:id', deleteDentist);

export {router};
