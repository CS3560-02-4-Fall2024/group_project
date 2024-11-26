import {Request, Response, NextFunction} from 'express';
import {Patient, PatientTable} from '../models/patient';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
// dotenv.config();

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
  console.log(req.body);

  const email: string = req.body.email;
  
  // TODO: make this actually check for email's existence
  const passwordHash: string = (await PatientTable.getByEmail(email))
    .passwordHash;
  const password: string = req.body.password;

  if (bcrypt.compareSync(password, passwordHash)) {
    const token: string = jwt.sign(
      {email: email, type: 'patient'},
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: '1d',
      },
    );
    res.json({authToken: token});
  } else {
    res.sendStatus(403);
  }
};

export const authorizePatient = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err || user.type !== 'patient'
        || req.body.email !== user.email
      ) return res.sendStatus(403);

      res.locals.user = user;

      next();
      return;
    },
  );
};
