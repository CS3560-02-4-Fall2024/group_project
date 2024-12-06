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
  const dentist: Dentist = req.body.dentist;
  dentist.passwordHash = bcrypt.hashSync(req.body.dentist.password, saltRounds);

  DentistTable.insert(dentist)
    .then((value: Dentist) => {
      res.json(new DentistView(value));
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

export const getDentistById = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const id = Number(req.params.id);
  DentistTable.getById(id)
    .then((value: Dentist) => {
      return res.json(new DentistView(value));
    })
    .catch((reason: any) => {
      if (reason === 'user not found') return res.sendStatus(400);
      return res.sendStatus(500);
    });
};

export const updateDentist = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const id: number = Number(req.params.id);
  const newDentist: Dentist = req.body.dentist;

  if (!id) return res.status(400).send('provide valid id');

  DentistTable.update(id, newDentist)
  .then((value: Dentist) => {
    res.json(new DentistView(value));
  })
  .catch(err => {
    res.status(400).json(err);
  })
}

export const deleteDentist = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const id: number = Number(req.params.id);

  if (!id) return res.status(400).send('provide valid id');

  DentistTable.delete(id)
    .then((value: number) => {
      res.json({deleted: value});
    })
    .catch(err => {
      res.send(400).json(err);
    });
};