import {Request, Response, NextFunction} from 'express';
import {Availability, AvailabilityTable} from '../models/availability';

export const createAvailability = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const availability: Availability = req.body;

  AvailabilityTable.insert(availability)
  .then((value: Availability) => res.json(value))
  .catch((err) => res.status(400).json(err));
}