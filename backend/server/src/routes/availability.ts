import express, {Router} from 'express';
import { bookAvailability, createAvailability, deleteAvailability, getAvailability } from '../controllers/availability';
import { authorizeDentist, authorizePatient } from '../controllers/auth';

const router: Router = express.Router();

router.get('/', getAvailability);

router.post('/', authorizeDentist, createAvailability);

router.delete('/', authorizeDentist, deleteAvailability);

// this shouldn't be here, since patients should post to appointment anyway
router.put('/:availabilityId', authorizePatient, bookAvailability);

export {router};
