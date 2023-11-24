import User from '../models/user.model.js';
import config from '../config/config.js';
import {expressjwt} from 'express-jwt';
import {handleAuthentication} from './handlers/auth.handlers.js';
import {removeCookie} from './handlers/cookie.handlers.js';
import {handleRequest} from './handlers/request.handlers.js';
import {handleResponse} from './handlers/response.handlers';

const signUp = async (req, res) => {
    const newUser = req.body;
    await handleRequest(User.create(newUser), 201, res);
};

const signIn = async (req, res) => {
    await handleAuthentication(req, res);
};

const signOut = (req, res) => {
    removeCookie(res);
    handleResponse(200, true, null, null, res);
};

const requireAuthentication = expressjwt({
    secret: config.jwt.secret,
    algorithms: ['HS256'],
    requestProperty: 'auth',
});

const requireAuthorization = (req, res, next) => {
    const authId = req.auth?.id?.toString();
    const userId = req.params.userId?.toString();
    const isAdmin = req.auth?.role === 'admin';
    const isAuthorized = authId === userId || isAdmin;
    if (isAuthorized) {
        next();
    } else {
        handleResponse(403, false, 'User is not authorized', res);
    }
};

// Middleware for authentication and authorization (both)
const requireAuthAndAuthorization = [
    requireAuthentication,
    requireAuthorization,
];

export default {
    signUp,
    signIn,
    signOut,
    requireAuthentication,
    requireAuthorization,
    requireAuthAndAuthorization,
};
