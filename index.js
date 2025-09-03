require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');

const setupLogger = require('./logger');
const router = require('./src/router/index');
const sequelize = require('./src/config/db_config');
const ErrorHandlingMiddleware = require('./src/middleware/ErrorHandlingMiddleware');

const app = express();

const host = process.env.HOST;
const port = process.env.PORT;

if (!port) {
    console.error("PORT не задан в переменных окружения!");
    process.exit(1);
}

// Middleware
app.use(express.json());
app.use(setupLogger()); 
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use('/', router);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ Error:'Неизвесная ошибка, Обратитесь к администратору сервера' });
});

app.use(ErrorHandlingMiddleware.handleError);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const server = http.createServer(app);
        server.listen(port, host || '0.0.0.0', () => {
            console.log(`Сервер запущен ${host || '0.0.0.0'}:${port}`);
        });

        server.on('error', (err) => {
            console.error('Ошибка', err);
            process.exit(1);
        });
    } catch (err) {
        console.error('Ошибка запуска сервера:', err.message);
        process.exit(1);
    }
};

start();
