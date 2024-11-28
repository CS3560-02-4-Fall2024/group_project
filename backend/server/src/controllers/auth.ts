import {Request, Response, NextFunction} from 'express';
import {Patient, PatientTable} from '../models/patient';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
        } else {
          res.sendStatus(403);
        }
      });
      // if (password === value) {
      //   const token: string = jwt.sign(
      //     {email: email, type: 'patient'},
      //     process.env.TOKEN_SECRET as string,
      //     {
      //       expiresIn: '1d',
      //     },
      //   );
      //   res.json({authToken: token});
      // } else {
      //   console.log('boo boo');
      //   res.sendStatus(403);
      // }
    })
    .catch(err => {
      console.log(err);
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
