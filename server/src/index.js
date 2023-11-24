import {startServers} from './setup/server.js';
import logger from './utilities/logger.js';

startServers().catch((err) => logger.error('Failed to start', err));
