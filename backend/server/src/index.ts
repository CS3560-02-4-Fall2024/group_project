import express, {Express} from 'express';
import dotenv from 'dotenv';

import {router as auth} from './routes/auth';
import {router as patient} from './routes/patient';
import {router as dentist} from './routes/dentist';
import {router as availability} from './routes/availability';
import {router as office} from './routes/office';

const app: Express = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use('/auth', auth);
app.use('/patient', patient);
app.use('/dentist', dentist);
// app.use('/availability', availability);
app.use('/office', office);

let route;
const routes: any[] = [];

app._router.stack.forEach(
  (middleware: {route: any; name: string; handle: {stack: any[]}}) => {
    if (middleware.route) {
      // routes registered directly on the app
      routes.push(middleware.route);
    } else if (middleware.name === 'router') {
      // router middleware
      middleware.handle.stack.forEach(handler => {
        route = handler.route;
        route && routes.push(route);
      });
    }
  },
);

console.log(routes);

dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
