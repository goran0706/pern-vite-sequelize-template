import http from 'http';
import https from 'https';

import app from './app.js';
import db from '../models/index.js';
import config from '../config/config.js';
import logger from '../utilities/logger.js';
import {getServerHostname, getServerUrl} from '../utilities/url.utils.js';
import {readCredentialsSync} from '../utilities/file.utils.js';

/* -------------------------------------------------------------------------- */
/*                                Server Utils                                */
/* -------------------------------------------------------------------------- */

const createServer = (protocol, credentials, app) => {
    return protocol.createServer(credentials, app);
};

const performStartupTasks = async () => {
    await db.checkConnection();
    await db.syncModels();
};

const handleStartup = async (server, protocol, port, shouldRunTasks) => {
    if (shouldRunTasks) await performStartupTasks();
    const hostname = getServerHostname();
    const url = getServerUrl(protocol, hostname, port);
    server.listen(port, hostname, () => logger.info(`Listening on ${url}`));
};

const handleStartupError = (error) => {
    logger.error(error);
    process.exit(1);
};

const handleShutdown = () => {
    const handleSignal = async () => {
        logger.info('Received shutdown signal. Shutting down gracefully...');
        await db.sequelize.close();
        process.exit(0);
    };

    // Remove existing event listeners before adding new ones
    process.off('SIGINT', handleSignal);
    process.off('SIGTERM', handleSignal);

    // Attach signal event listeners when the server starts
    process.on('SIGINT', handleSignal);
    process.on('SIGTERM', handleSignal);
};

/* -------------------------------------------------------------------------- */
/*                                Starting                                    */
/* -------------------------------------------------------------------------- */

const startServer = async (server, protocol, port, shouldRunTasks = true) => {
    try {
        await handleStartup(server, protocol, port, shouldRunTasks);
    } catch (error) {
        handleStartupError(error);
    }
    handleShutdown();
};

export const startHttpServer = async () => {
    const httpServer = createServer(http, null, app);
    await startServer(httpServer, 'http', config.httpServer.port, false);
    return httpServer;
};

export const startHttpsServer = async () => {
    const {privateKeyPath, certificatePath} = config.httpsServer.certificate;
    const credentials = readCredentialsSync(privateKeyPath, certificatePath);
    const httpsServer = createServer(https, credentials, app);
    await startServer(httpsServer, 'https', config.httpsServer.port);
    return httpsServer;
};

export const startServers = async () => {
    const httpServer = await startHttpServer();
    const httpsServer = await startHttpsServer();
    return {httpServer, httpsServer};
};

/* -------------------------------------------------------------------------- */
/*                                Stopping                                    */
/* -------------------------------------------------------------------------- */

const stopServer = (server, serverType) => {
    server.close(() => logger.info(`${serverType} server closed`));
};

export const stopHttpServer = (httpServer) => {
    stopServer(httpServer, config.httpServer.protocol);
};

export const stopHttpsServer = (httpsServer) => {
    stopServer(httpsServer, config.httpsServer.protocol);
};

export const stopServers = (httpServer, httpsServer) => {
    stopHttpServer(httpServer);
    stopHttpsServer(httpsServer);
};
