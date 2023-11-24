import config from '../config/config.js';

export const getServerUrl = (protocol, hostname, port, endpoint) => {
    return `${protocol}://${hostname}:${port}${endpoint ? endpoint : ''}`;
};

export const getServerHostname = (protocol) => {
    return protocol === 'http' ?
        config.httpServer.hostname
        : config.httpsServer.hostname;
};
