import {Request, Response, NextFunction} from 'express';
import {Patient, PatientTable, PatientView} from '../models/patient';
import {Dentist, DentistTable, DentistView} from '../models/dentist';
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
      return bcrypt
        .compare(password, value.passwordHash)
        .then((success: boolean) => {
          if (success) {
            const token: string = jwt.sign(
              {id: value.id, email: email, type: 'patient'},
              process.env.TOKEN_SECRET as string,
              {
                expiresIn: '1d',
              },
            );
            res.json({authToken: token, user: new PatientView(value)});
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
      if (err || user.type !== 'patient')
        return res.sendStatus(403);

      res.locals.user = user;
      return next();
    },
  );
};

export const createPatient = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const patient: Patient = req.body;
  patient.passwordHash = bcrypt.hashSync(
    patient.password,
    Number(process.env.SALT_ROUNDS),
  );

  PatientTable.insert(patient)
    .then((value: Patient) => {
      next();
    })
    .catch(err => {
      res.status(400).json({error: err.code});
    });
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
      return bcrypt
        .compare(password, value.passwordHash)
        .then((success: boolean) => {
          if (success) {
            const token: string = jwt.sign(
              {id: value.id, email: email, type: 'dentist'},
              process.env.TOKEN_SECRET as string,
              {
                expiresIn: '1d',
              },
            );
            res.json({authToken: token, user: new DentistView(value)});
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
      if (err || user.type !== 'dentist')
        return res.sendStatus(403);

      res.locals.user = user;
      return next();
    },
  );
};

export const createDentist = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const dentist: Dentist = req.body;
  dentist.passwordHash = bcrypt.hashSync(
    dentist.password,
    Number(process.env.SALT_ROUNDS),
  );

  DentistTable.insert(dentist)
    .then((value: Dentist) => {
      next();
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
