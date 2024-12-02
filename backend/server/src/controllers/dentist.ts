import {Request, Response, NextFunction} from 'express';
import {Dentist, DentistTable, DentistView} from '../models/dentist';
import bcrypt from 'bcrypt';
import {Appointment, AppointmentTable} from '../models/appointment';
import {Patient, PatientTable} from '../models/patient';

const saltRounds = Number(process.env.SALT_ROUNDS);

export const createDentist = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.body.passwordHash = bcrypt.hashSync(req.body.password, saltRounds);

  const dentist: Dentist = req.body;
  DentistTable.insert(dentist)
    .then((value: Dentist) => {
      res.locals.dentist = value;
      next();
    })
    .catch(err => {
      res.status(400).json({error: err.code});
    });
};

export const getDentistById = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const id = Number(req.query.id);
  DentistTable.getById(id)
    .then((value: Dentist) => {
      return res.json(new DentistView(value));
    })
    .catch((reason: any) => {
      if (reason === 'user not found') return res.sendStatus(400);
      return res.sendStatus(500);
    });
};

export const getDentistAppts = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const dentistID = Number(req.query.id);
  AppointmentTable.getByDentistId(dentistID)
    .then((value: Appointment[]) => {
      return res.json(value);
    })
    .catch((reason: any) => {
      return res.sendStatus(500);
    });
};

export const getScheduled = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const dentistID = Number(req.query.id);
  AppointmentTable.getByDentistIdScheduled(dentistID)
    .then((value: Appointment[]) => {
      return res.json(value);
    })
    .catch((reason: any) => {
      return res.sendStatus(500);
    });
};

export const getPatientById = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const id = Number(req.query.id);
  PatientTable.getById(id)
    .then((value: Patient) => {
      return res.json(value);
    })
    .catch((reason: any) => {
      if (reason === 'user not found') return res.sendStatus(400);
      return res.sendStatus(500);
    });
};

export const getBofa = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const pId = Number(req.query.patientId);
  const dId = Number(req.query.dentistId);
  AppointmentTable.getBofa(pId, dId)
    .then((value: Appointment[]) => {
      return res.json(value);
    })
    .catch((reason: any) => {
      return res.sendStatus(500);
    });
};
