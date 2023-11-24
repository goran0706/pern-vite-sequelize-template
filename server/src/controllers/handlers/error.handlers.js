import logger from '../../utilities/logger.js';
import {ValidationError} from 'sequelize';
import {UnauthorizedError} from 'express-jwt';
import {handleResponse} from './response.handlers';

const handleValidationErrors = (err, res) => {
    const status = err.status || err.statusCode || 500;
    const error = err.errors[0]?.message || 'Validation Error';
    handleResponse(status, false, error, null, res);
};

const handleAuthorizationErrors = (err, res) => {
    const status = err.status || err.statusCode || 500;
    const error = err.message || 'Authorization Error';
    handleResponse(status, false, error, null, res);
};

const handleGenericError = (err, res) => {
    logger.error('Error:', err);
    const status = err.status || err.statusCode || 500;
    const error = 'Internal Server Error';
    handleResponse(status, false, error, null, res);
};

export const handleError = (error, res) => {
    if (error instanceof UnauthorizedError) {
        handleAuthorizationErrors(error, res);
    } else if (error instanceof ValidationError) {
        handleValidationErrors(error, res);
    } else {
        handleGenericError(error, res);
    }
};
