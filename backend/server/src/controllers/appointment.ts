import {Request, Response, NextFunction} from 'express';
import {Appointment, AppointmentTable} from '../models/appointment';
import {Availability, AvailabilityTable} from '../models/availability';

export const bookAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const appointment: Appointment = req.body;
  const dentistId: number = appointment.dentistId;
  const timeSlot: Date = appointment.timeSlot;
  console.log('timeSlot: ', timeSlot);

  AvailabilityTable.updateAvailability(
    dentistId,
    String(timeSlot),
    'unavailable',
  )
    .then((value: Availability) => {
      AppointmentTable.insert(appointment)
        .then((val: Appointment) => {
          res.json(val);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });

  // AppointmentTable.insert(appointment)
  // .then((value: Appointment) => {
  //     console.log('working insert: ', value);
  // })
  // .catch(err => res.status(400).send('y tho'));
};
