
const {constants} = require('../constants');
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    switch (statusCode) {
        case 400:
            const messages = Object.values(err.errors).map((val) => val.message);
            res.json({
                title: "Validation Failed",
                message: messages,
                stackTrace: err.stack
            });
            break;
        case 401:
            res.json({
                title: "Unauthorized",
                message: "Access denied",
                stackTrace: err.stack
            });
            break;
        case 403:
            res.json({
                title: "Forbidden",
                message: "Access denied",
                stackTrace: err.stack
            });
            break;
        case 404:
            res.json({
                title: "Not Found",
                message: "Resource not found",
                stackTrace: err.stack
            });
            break;
        case 500:
            res.json({
                title: "Server Error",
                message: "Internal server error",
                stackTrace: err.stack
            });
            break;
        default:
            console.log("No Error... All gone well...")
            break;
    }
}

module.exports = errorHandler;

