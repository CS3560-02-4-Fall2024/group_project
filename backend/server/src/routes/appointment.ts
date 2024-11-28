import express, {Router} from 'express';
import {
  getAppointmentById,
  getAppointmentsByDentistId,
  getAppointmentsByPatientId,
  getLatestAppointmentByPatientId,
  getAppointmentsByDate,
  createAppointment,
  deleteAppointment,
  editAppointment,
} from '../controllers/appointment';

const router = express.Router();

router.get('/:id', getAppointmentById);
router.get('/dentist/:dentistId', getAppointmentsByDentistId);
router.get('/:patient:patientId', getAppointmentsByPatientId);
router.get('/patient/:patientId/latest', getLatestAppointmentByPatientId); // Get latest appointment by patient ID
router.get('/date/:date', getAppointmentsByDate);

router.put('/', createAppointment);

router.delete('/:id', deleteAppointment);

router.post('/:id', editAppointment);

export {router};
