class ErrorHandlingMiddleware {
    static handleError(err, req, res, next) {
        console.error(err.stack);
        const statusCode = err.status || 500;
        res.status(statusCode).json({
            message: err.message || 'Internal Server Error',
            status: statusCode,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        });
    }
}

module.exports = ErrorHandlingMiddleware;
