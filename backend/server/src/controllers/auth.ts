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
  const passwordHash: string = (await PatientTable.getByEmail(email)).passwordHash;
  const password: string = req.body.password;

  if (bcrypt.compareSync(password, passwordHash)) {
    const secret: string = String(process.env.TOKEN_SECRET);
    console.log(secret);

    const token: string = jwt.sign({email: email}, secret, {expiresIn: '1d'});
    res.json({authToken: token});
  } else {
    res.sendStatus(403);
  }
};
