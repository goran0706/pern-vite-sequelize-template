import config from '../config/config.js';
import {getServerUrl} from '../utilities/url.utils.js';

const redirectMiddleware = (req, res, next) => {
    const isProduction = config.environment === 'production';
    const isHttpProtocol = req.protocol === config.httpsServer.protocol;

    if (isProduction && isHttpProtocol) {
        const {protocol, hostname, port} = config.httpsServer;
        const redirectTo = getServerUrl(protocol, hostname, port, req.url);
        return res.redirect(301, redirectTo);
    } else {
        next();
    }
};

export default redirectMiddleware;
