import {Request, Response, NextFunction} from 'express';
import {Dentist, DentistTable, DentistView} from '../models/dentist';
import bcrypt from 'bcrypt';

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
