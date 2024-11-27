import {Request, Response, NextFunction} from 'express';
import {Patient, PatientTable, PatientView} from '../models/patient';
import bcrypt from 'bcrypt';

const saltRounds: number = Number(process.env.SALT_ROUNDS);

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
  const email: string = req.body.email;

  PatientTable.getByEmail(email)
    .then((value: Patient) => {
      return res.json(new PatientView(value));
    })
    .catch((reason: any) => {
      if (reason == 'user not found') return res.sendStatus(400);
      return res.sendStatus(500);
    });
};
