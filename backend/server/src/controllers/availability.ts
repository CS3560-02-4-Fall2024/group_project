import {Request, Response, NextFunction} from 'express';
import {
  Availability,
  AvailabilityTable,
  AvailabilityView,
} from '../models/availability';

export const createAvailability = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const availability: Availability = req.body;

  const userId: number = res.locals.user.id;

  if (userId != availability.dentistId)
    return res.status(403).send('only make availability for yourself');

  AvailabilityTable.insert(availability)
    .then((value: Availability) => res.json(value))
    .catch(err => res.status(400).json(err));
};

export const getAvailability = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const dentistId: number = Number(req.params.dentistId);

  AvailabilityTable.getByDentistID(dentistId)
  .then((value: Availability[]) => {
    res.json(value.map((elem: Availability) => new AvailabilityView(elem)));
  })
  .catch((err) => res.status(400).json(err));
};

export const deleteAvailability = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const dentistId: number = res.locals.user.id;
  const start: string = req.body.startTime;
  const end: string = req.body.endTime;

  AvailabilityTable.delete(dentistId, start, end)
  .then((value: number) => res.json({deleted: value}))
  .catch((err) => res.status(400).json(err));
}

export const bookAvailability = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const availabilityId: number = Number(req.params.availabilityId);
  
  AvailabilityTable.book(availabilityId)
  .then((value: number) => {
    res.json({booked: value})
  })
  .catch((err) => {
    res.status(400).json(err);
  })
}