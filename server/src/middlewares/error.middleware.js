import {handleError} from '../controllers/handlers/error.handlers';

const errorMiddleware = (err, req, res, _next) => {
    handleError(err, res);
};

export default errorMiddleware;
