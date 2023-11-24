import {handleResponse} from './response.handlers';
import {handleError} from './error.handlers.js';

export const handleRequest = async (query, status, res) => {
    try {
        const data = query ? await query : null;
        handleResponse(status, true, null, data, res);
    } catch (error) {
        handleError(error, res);
    }
};

export const handleRequestById = async (query, propName, req, res, next) => {
    try {
        const data = query ? await query : null;
        if (data) {
            req[propName] = data;
            next();
        } else {
            handleResponse(404, false, 'Resource Not Found', null, res);
        }
    } catch (error) {
        handleError(error, res);
    }
};
