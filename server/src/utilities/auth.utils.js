import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const generateSalt = (saltRounds = 10) => {
    return bcrypt.genSalt(saltRounds);
};

export const generateSaltSync = (saltRounds = 10) => {
    return bcrypt.genSaltSync(saltRounds);
};

export const generateHash = (plainText, salt) => {
    return bcrypt.hash(plainText, salt);
};

export const generateHashSync = (plainText, salt) => {
    return bcrypt.hashSync(plainText, salt);
};

export const comparePassword = async (plainText, passwordHashed) => {
    return bcrypt.compare(plainText, passwordHashed);
};

export const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });
    const data = {
        tokenType: 'Bearer',
        accessToken: accessToken,
        expiresIn: config.jwt.expiresIn,
    };
    return [accessToken, data];
};

export const verifyToken = (token) => {
    return jwt.verify(token, config.jwt.secret);
};
