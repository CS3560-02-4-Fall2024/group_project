import express, {Express} from 'express';
import dotenv from 'dotenv';

import {router as auth} from './routes/auth';
import {router as patient} from './routes/patient';
import {router as dentist} from './routes/dentist';

const app: Express = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use('/auth', auth);
app.use('/patient', patient);
app.use('/dentist', dentist);

dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
