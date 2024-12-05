import express, {Router} from 'express';
import {
  createOffice,
  deleteOffice,
  getOffices,
  updateOffice,
} from '../controllers/office';

const router: Router = express.Router();

router.get('/', getOffices);

router.post('/', createOffice);

router.put('/:id', updateOffice);

router.delete('/:id', deleteOffice);

export {router};
