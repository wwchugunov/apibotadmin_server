require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const router = require('./src/router/index');
const sequelize = require('./src/config/db_config');
const ErrorHandlingMiddleware = require('./src/middleware/ErrorHandlingMiddleware');

const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDir,
    compress: 'gzip'
});

morgan.token('body', (req) => JSON.stringify(req.body || {}));

app.use(morgan('dev'));
app.use(morgan(':method :url :status :response-time ms - :body', { stream: accessLogStream }));

app.use('/', router);
app.use(ErrorHandlingMiddleware.handleError);
app.use((req, res) => res.status(404).send("Not found"));

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        http.createServer(app).listen(port, host, () => {
            console.log(`Server running on ${host}:${port}`);
        });
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
};

start();
