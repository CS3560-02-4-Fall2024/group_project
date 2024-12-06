import {Request, Response, NextFunction} from 'express';
import {Patient, PatientTable} from '../models/patient';
import {Dentist, DentistTable} from '../models/dentist';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const authenticatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  PatientTable.getByEmail(email)
    .then((value: Patient) => {
      return bcrypt.compare(password, value.passwordHash).then((success: boolean) => {
        if (success) {
          const token: string = jwt.sign(
            {id: value.id, email: email, type: 'patient'},
            process.env.TOKEN_SECRET as string,
            {
              expiresIn: '1d',
            },
          );
          res.json({authToken: token});
        } else {
          res.sendStatus(403);
        }
      });
    })
    .catch(() => {
      res.sendStatus(403);
    });
};


// Authorize Patient
export const authorizePatient = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err || user.type !== 'patient' || user.id !== Number(req.params.id))
        return res.sendStatus(403);

      res.locals.user = user;
      return next();
    },
  );
};

// Authenticate Dentist by ID
export const authenticateDentist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  DentistTable.getByEmail(email)
    .then((value: Dentist) => {
      return bcrypt.compare(password, value.passwordHash).then((success: boolean) => {
        if (success) {
          const token: string = jwt.sign(
            {id: value.id, email: email, type: 'dentist'},
            process.env.TOKEN_SECRET as string,
            {
              expiresIn: '1d',
            },
          );
          res.json({authToken: token});
        } else {
          res.sendStatus(403);
        }
      });
    })
    .catch(() => {
      res.sendStatus(403);
    });
};

// Authorize Dentist
export const authorizeDentist = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err || user.type !== 'dentist' || user.id !== Number(req.params.id))
        return res.sendStatus(403);

      return next();
    },
  );
};
