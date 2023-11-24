import config from '../../config/config.js';

export const attachCookie = (token, res) => {
    res.cookie('t', token, {
        httpOnly: true,
        secure: config.environment === 'production',
        expire: config.jwt.expiresIn,
    });
};

export const removeCookie = (res) => {
    res.clearCookie('t');
};
