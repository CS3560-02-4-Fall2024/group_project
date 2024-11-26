import express, {Router, Request, Response} from 'express';
import {Patient, PatientTable} from '../models/patient';
import { createNewPatient } from '../controllers/auth';

const router: Router = express.Router();

// TODO: implement user auth controllers

// login to patient

// create patient acc
router.post('/patient', createNewPatient);

// login to dentist

// create dentist

export {router};
