const {constants} = require('../helpers/constants');

const errorHandler = (err, req, res, next) => {
    console.log('dddd')
    const statusCode = res.statusCod ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: 'Validation Error',
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: 'Resource Not Found',
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: 'Unauthorized',
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: 'Forbidden',
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;
        case constants.INTERNAL_SERVER_ERROR:
            res.json({
                title: 'Internal Server Error',
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;
    
        default:
            console.log('Everything is fine');
            break;
    }
};

module.exports = errorHandler;