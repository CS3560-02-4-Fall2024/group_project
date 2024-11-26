import {Request, Response, NextFunction} from 'express';
import {Patient, PatientTable} from '../models/patient';

export const createNewPatient = (req: Request, res: Response, next: NextFunction) => {
  const patient: Patient = req.body;

  PatientTable.insert(patient)
    .then((value: Patient) => {
        next();
    })
    .catch(err => {
      res.status(400).json({error: err.code}).end();
    });
};