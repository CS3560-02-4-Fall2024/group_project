import {Request, Response, NextFunction} from 'express';
import {Patient, PatientTable, PatientView} from '../models/patient';
import bcrypt from 'bcrypt';
import {Appointment, AppointmentTable} from '../models/appointment';
const saltRounds = Number(process.env.SALT_ROUNDS);

export const createPatient = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const patient: Patient = req.body;
  patient.passwordHash = bcrypt.hashSync(patient.password, saltRounds);

  PatientTable.insert(patient)
    .then((value: Patient) => {
      res.json(new PatientView(value));
    })
    .catch(err => {
      res.status(400).json({error: err.code});
    });
};

export const getPatientById = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const id: number = Number(req.params.id);

  PatientTable.getById(id)
    .then((value: Patient) => {
      return res.json(new PatientView(value));
    })
    .catch((reason: any) => {
      if (reason === 'user not found') return res.sendStatus(400);
      return res.sendStatus(500);
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

export const updatePatient = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const id: number = Number(req.params.id);
  const newPatient: Patient = req.body;

  if (!id) return res.status(400).send('provide valid id');

  PatientTable.update(id, newPatient)
    .then((value: Patient) => {
      res.json(new PatientView(value));
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

export const deletePatient = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const id: number = Number(req.params.id);

  if (!id) return res.status(400).send('provide valid id');

  PatientTable.delete(id)
    .then((value: number) => {
      res.json({deleted: value});
    })
    .catch(err => {
      res.send(400).json(err);
    });
};
