import {Request, Response, NextFunction} from 'express';
import {AvailabilityTable} from '../models/availability';

export const getAvailabilityByPatientEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const email = res.locals.user.email;

  AvailabilityTable.getByEmail(email)
    .then(value => {
      res.json(value);
    })
    .catch(err => {
      console.log(err);

      res.sendStatus(400);
    });
};
