import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'groupProject',
// });

// to use with aws rds, just uncomment all this shit

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_TABLE,
});

connection.connect();

export {connection};
