import {Request, Response, NextFunction} from 'express';
import {Appointment, AppointmentTable} from '../models/appointment';

export const getAppointmentById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id: number = parseInt(req.params.id, 10);

  AppointmentTable.getById(id)
    .then((appointment: Appointment) => res.json(appointment))
    .catch(err => res.status(400).json({error: err}));
};

export const getAppointmentsByDentistId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const dentistId: number = parseInt(req.params.dentistId, 10);

  AppointmentTable.getByDentistId(dentistId)
    .then(appointments => res.json(appointments))
    .catch(err => res.status(400).json({error: err}));
};

export const getAppointmentsByPatientId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const patientId: number = parseInt(req.params.patientId, 10);

  AppointmentTable.getByPatientId(patientId)
    .then(appointments => res.json(appointments))
    .catch(err => res.status(400).json({error: err}));
};

export const getLatestAppointmentByPatientId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const patientId: number = parseInt(req.params.patientId, 10);

  AppointmentTable.getByPatientId(patientId)
    .then(appointments => {
      if (appointments.length === 0) {
        res.status(404).json({error: 'No appointments found'});
      }
      const latestAppointment = appointments[appointments.length - 1];
      res.json(latestAppointment);
    })
    .catch(err => res.status(400).json({error: err}));
};

export const getAppointmentsByDate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const date: string = req.params.date;

  AppointmentTable.getByDate(date)
    .then(appointments => res.json(appointments))
    .catch(err => res.status(400).json({error: err}));
};

export const createAppointment = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const appointment: Appointment = req.body;

  AppointmentTable.insert(appointment)
    .then(newAppointment => res.status(201).json(newAppointment))
    .catch(err => res.status(400).json({error: err}));
};

export const deleteAppointment = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id: number = parseInt(req.params.id, 10);

  AppointmentTable.deleteById(id)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json({error: err}));
};

export const editAppointment = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id: number = parseInt(req.params.id, 10);
  const updatedData: Partial<Appointment> = req.body;

  AppointmentTable.update(id, updatedData)
    .then(updatedAppointment => res.json(updatedAppointment))
    .catch(err => res.status(400).json({error: err}));
};
