import {Request, Response, NextFunction} from 'express';
import {Patient, PatientTable, PatientView} from '../models/patient';

export const getPatientProfileByEmail = (
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
