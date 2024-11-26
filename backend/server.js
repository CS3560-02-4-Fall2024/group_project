// lets us use env file variables
require('dotenv').config()

const express = require('express');

// use express
const app = express();

// express can use json now
app.use(express.json());

// grabs db info and tests a connection
const sequelize = require('./database');

// middleware
var cors = require('cors');
app.use(cors());

// Routers
const officeRouter = require('./routes/OfficeRoutes')
app.use("/offices", officeRouter);


// default get route for testing
app.get('/', function(req, res) {
    console.log(res.headersSent);
    let sql = "SELECT * FROM offices";
    connection.query(sql, function(err, results) {
        if (err) {
            throw err;
        }
        res.send(results);
    })
});

// syncs models with db and then starts the server
(async () => {
    try {
        await sequelize.sync();
        app.listen(process.env.PORT, () => {
            console.log("El server is running on port numba " + process.env.PORT);
        });
    } catch (error) {
        console.error("error", error);
    }
})();

