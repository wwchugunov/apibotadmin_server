const express = require('express');
require('dotenv').config();
const sequelize = require('./src/config/db_config');
const router = require('./src/router/index');
const cors = require('cors');
const http = require('http');
const ErrorHandlingMiddleware = require('./src/middleware/ErrorHandlingMiddleware');
const host = process.env.HOST
const port = process.env.PORT || 5000;
// const telegrambot = require('./telegram');
const app = express();
app.use(cors());

app.use(express.json());

app.use('/', router);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(ErrorHandlingMiddleware.handleError);

app.use((req, res) => {
    res.status(404).send("Not found");
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        const server = http.createServer(app);
        server.listen(port, host, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);


    }
};

start();
