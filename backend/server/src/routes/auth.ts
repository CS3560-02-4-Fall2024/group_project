import express, {Router, Request, Response} from 'express';
import {Patient, PatientTable} from '../models/patient';

const router: Router = express.Router();

// TODO: implement user auth controllers

// login to patient

// create patient acc
router.post('/patient', (req: Request, res: Response) => {
  console.log(req.body);
  const patient: Patient = req.body;

  PatientTable.save(patient)
    .then((value: Patient) => {
      res.json(value);
    })
    .catch(err => {
      res.status(400).json({error: err.code});
    });
});

// login to dentist

// create dentist

export {router};
