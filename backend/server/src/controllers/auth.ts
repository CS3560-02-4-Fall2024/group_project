import {Request, Response, NextFunction} from 'express';
import {Patient, PatientTable} from '../models/patient';
import {Dentist, DentistTable} from '../models/dentist';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Authenticate Patient
export const authenticatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let email: string;
  let password: string;
  // if length is 0, then the previous req res cycle function was NOT createAcc
  if (Object.keys(res.locals).length === 0) {
    email = req.body.email;
    password = req.body.password;
  } else {
    // this stuff came from createAcc function
    email = res.locals.patient.email;
    password = req.body.password;
  }
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
      if (err || user.type !== 'patient' /*|| req.body.email !== user.email */)
        return res.sendStatus(403);

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
  //const id: number = req.body.id;
  //const password: string = req.body.password;

  let id: number;
  let password: string;

  if (Object.keys(res.locals).length === 0) {
    id = req.body.id;
    password = req.body.password;
  } else {
    id = res.locals.dentist.id;
    password = req.body.password;
  }

  DentistTable.getById(id)
    .then((value: Dentist) => {
      return value.passwordHash;
    })
    .then((value: string) => {
      return bcrypt.compare(password, value).then((success: boolean) => {
        if (success) {
          const token: string = jwt.sign(
            {id: id, type: 'dentist'},
            process.env.TOKEN_SECRET as string,
            {
              expiresIn: '1d',
            },
          );
          res.json({authToken: token, id: id});
        } else {
          res.sendStatus(403);
        }
      });
      //if (password === value) {
      //  const token: string = jwt.sign(
      //    {id: id, type: 'dentist'},
      //    process.env.TOKEN_SECRET as string,
      //    {
      //      expiresIn: '1d',
      //    },
      //  );
      //  res.json({authToken: token});
      //} else {
      //  console.log('boo boo');
      //  res.sendStatus(403);
      //}
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
      if (err || user.type !== 'dentist' /*|| req.body.id !== user.id*/)
        return res.sendStatus(403);

      return next();
    },
  );
};
