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
  const timeSlot: string = appointment.timeSlot;
  console.log('timeslot', timeSlot);
  

  AvailabilityTable.updateAvailability(
    dentistId,
    timeSlot,
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
};

export const getAppointment = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const appointmentId: number = Number(req.params.appointmentId);

  AppointmentTable.getById(appointmentId)
    .then((value: Appointment) => {
      if (
        value.patientId !== res.locals.user.id &&
        value.dentistId !== res.locals.user.id
      ) {
        res.status(403).json({message: 'not your appointment'});
      } else res.json(value);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

export const getAppointments = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
    const userId: number = res.locals.user.id;
    const userType: string = res.locals.user.type;

    if (userType === 'patient') {
        AppointmentTable.getByPatientId(userId)
        .then((value: Appointment[]) => {
            res.json(value);
        })
        .catch(err => res.status(400).json(err));
    }
    else if (userType === 'dentist') {
        AppointmentTable.getByDentistId(userId)
        .then((value: Appointment[]) => {
            res.json(value);
        })
        .catch(err => res.status(400).json(err));
    }
    else {
        res.status(400).json({message: 'invalid user type'})
    }
}


export const cancelAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const appointmentId: number = Number(req.params.appointmentId);

  AppointmentTable.getById(appointmentId)
    .then((value: Appointment) => {
        const d = new Date(value.timeSlot);
        d.setHours(d.getHours() - 8);
      const timeSlot: string = d.toISOString().slice(0, 19);
      AvailabilityTable.updateAvailability(
        value.dentistId,
        timeSlot,
        'available',
      )
        .then((val: Availability) => {
          AppointmentTable.delete(appointmentId).then((val: number) => {
            res.json({deleted: val});
          })
          .catch((err) => {
            res.status(400).json(err);
          })
        })
        .catch(err => {
          res.status(400).json(err);
        });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
