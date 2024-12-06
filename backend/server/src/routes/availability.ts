import express, {Router} from 'express';
import {authorizePatient} from '../controllers/auth';

const router: Router = express.Router();


export {router};
