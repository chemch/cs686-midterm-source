//importing express, environmental variables, bodyparser, router, database connection function and declaring them in a varibale to be using it in our index.js file
const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./db/ConnectDB');
const app = express();
const router = require('./routes/DBOperRoutes');
const bodyParser = require('body-parser');
const cors = require("cors")
dotenv.config();

// using the port in environmental variable 
const containerPort = process.env.PORT;
const hostPort = process.env.HOST_PORT;
const host = process.env.HOST;

// print variable values
console.log(`General Start Up Info:`)
console.log(`\tContainer port: ${containerPort}`);
console.log(`\tHost port: ${hostPort}`);
console.log(`\tHost: ${host}`);

// middleware to parse incoming request in bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// initialize the database connection pool
let pool;

(async () => {
    pool = await ConnectDB();

    // pass the pool to the routes
    app.use((req, res, next) => {
        req.pool = pool;
        next();
    });

    // use the router
    app.use("/", router);

    // Allow all origins
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // Handle preflight requests for all routes
    app.options('*', cors());

    app.get('/api/test', (req, res) => {
        res.json({ message: "CORS is now open to any origin!" });
    });

    // start the server
    app.listen(containerPort, () => {
        console.log(`Container listening on: http://${host}:${containerPort}`);
        console.log(`Host listening on: http://${host}:${hostPort}`);
    });
})();
