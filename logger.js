const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDir,
  compress: 'gzip'
});

morgan.token('body', (req) => JSON.stringify(req.body || {}));

function setupLogger() {
  return [
    morgan('dev'), // вывод в консоль
    morgan(':method :url :status :response-time ms - :body', { stream: accessLogStream })
  ];
}

module.exports = setupLogger;
    