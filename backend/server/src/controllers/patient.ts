import {Request, Response, NextFunction} from 'express';
import {Patient, PatientTable, PatientView} from '../models/patient';
import bcrypt from 'bcrypt';
import {Appointment, AppointmentTable} from '../models/appointment';
import {DentistTable} from '../models/dentist';
import {AvailabilityTable} from '../models/availability';
import {Next} from 'mysql2/typings/mysql/lib/parsers/typeCast';

// removed type assignment :number cuz theres an error with tslint
const saltRounds = Number(process.env.SALT_ROUNDS);

export const createPatient = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.body.passwordHash = bcrypt.hashSync(req.body.password, saltRounds);

  const patient: Patient = req.body;

  PatientTable.insert(patient)
    .then((value: Patient) => {
      res.locals.patient = value;
      next();
    })
    .catch(err => {
      res.status(400).json({error: err.code});
    });
};

export const getPatientByEmail = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const email: any = req.query.email;
  PatientTable.getByEmail(email)
    .then((value: Patient) => {
      return res.json(new PatientView(value));
    })
    .catch((reason: any) => {
      if (reason === 'user not found') return res.sendStatus(400);
      return res.sendStatus(500);
    });
};

export const getPatientAppt = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const id = Number(req.body.id);
  AppointmentTable.getByPatientId(id)
    .then((value: Appointment[]) => {
      return res.json(value);
    })
    .catch((reason: any) => {
      if (reason === 'appts not found') return res.sendStatus(400);
      return res.sendStatus(500);
    });
};

export const postAppt = (req: Request, res: Response, next: NextFunction) => {
  const appointment: Appointment = req.body.info;
  console.log(req.body);

  AppointmentTable.insert(appointment)
    .then((value: Appointment) => {
      res.json(value);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

export const cancelAppt = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  console.log(req.body);

  const {id} = req.body;

  AppointmentTable.cancelById(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err: any) => {
      res.status(500).json({error: err.message});
    });
};

export const getPastAppts = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const {id} = req.body;

  AppointmentTable.getPastApptsByPatientId(id)
    .then(appointments => {
      res.json(appointments);
    })
    .catch((err: any) => {
      res.status(500).json({error: err.message});
    });
};

export const getDentistByType = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const type = String(req.query.type);
  DentistTable.getByType(type)
    .then(dentists => {
      res.json(dentists);
    })
    .catch((err: any) => {
      res.status(500).json({error: err.message});
    });
};

export const getAvailabilities = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const dentistId = Number(req.query.dentistId);
  AvailabilityTable.getByDentistID(dentistId)
    .then(availabilities => {
      res.json(availabilities);
    })
    .catch((err: any) => {
      res.status(500).json({error: err.message});
    });
};

export const getDentistByName = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const dentistName = String(req.query.name);
  DentistTable.getByName(dentistName)
    .then(dentist => {
      res.json(dentist);
    })
    .catch((err: any) => {
      res.status(500).json({error: err.message});
    });
};

export const getIdAndDate = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const dentistId = Number(req.query.dentistId);
  const date = String(req.query.date);
  AvailabilityTable.getIdAndDate(dentistId, date)
    .then(avail => {
      res.json(avail);
    })
    .catch((err: any) => {
      res.status(500).json({error: err.message});
    });
};
