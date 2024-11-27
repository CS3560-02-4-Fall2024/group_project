import {Request, Response, NextFunction} from 'express';
import {Patient, PatientTable} from '../models/patient';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const createNewPatient = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.body.passwordHash = bcrypt.hashSync(req.body.password, saltRounds);

  const patient: Patient = req.body;

  PatientTable.insert(patient)
    .then((value: Patient) => {
      res.locals.patient = value;
      next();
    })
    .catch(err => {
      res.status(400).json({error: err.code});
    });
};

export const authenticatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  // TODO: make this actually check for email's existence
  PatientTable.getByEmail(email)
    .then((value: Patient) => {
      return value.passwordHash;
    })
    .then((value: string) => {
      return bcrypt.compare(password, value).then((success: boolean) => {
        if (success) {
          const token: string = jwt.sign(
            {email: email, type: 'patient'},
            process.env.TOKEN_SECRET as string,
            {
              expiresIn: '1d',
            },
          );
          res.json({authToken: token});
          next();
        } else {
          res.sendStatus(403);
        }
      });
    })
    .catch(() => {
      res.sendStatus(403);
    });
};

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
      if (err || user.type !== 'patient' || req.body.email !== user.email)
        return res.sendStatus(403);

      return next();
    },
  );
};
