import 'dotenv/config.js';
import {getCurrentWorkingDirectory} from '../utilities/file.utils.js';

const {
    NODE_ENV = 'development',
    HOSTNAME = 'localhost',
    HTTP_PORT = 8080,
    HTTPS_PORT = 8433,
    ALLOWED_ORIGINS = '*',
    PRIVATE_KEY_PATH = '/server/ssl/key.pem',
    CERTIFICATE_PATH = '/server/ssl/cert.pem',
    LOG_LEVEL = 'info',
    LOGS_DIR = `${getCurrentWorkingDirectory()}/logs`,
    JWT_SECRET = '825cb8c25cfdbbf313f65eea010b2883788683438f25fa79edb5daccf1e9f750',
    JWT_EXPIRES_IN = '1h',
    DEV_DB_USERNAME = 'postgres',
    DEV_DB_PASSWORD = 'postgres',
    DEV_DB_NAME = 'sequelize_demo',
    DEV_DB_HOSTNAME = 'localhost',
    DEV_DB_PORT = '5432',
    CI_DB_USERNAME,
    CI_DB_PASSWORD,
    CI_DB_NAME,
    PROD_DB_USERNAME,
    PROD_DB_PASSWORD,
    PROD_DB_NAME,
    PROD_DB_HOSTNAME,
    PROD_DB_PORT,
} = process.env;

const config = {
    environment: NODE_ENV,
    httpServer: {
        protocol: 'http',
        hostname: HOSTNAME,
        port: HTTP_PORT,
        allowedOrigins: ALLOWED_ORIGINS,
    },
    httpsServer: {
        protocol: 'https',
        hostname: HOSTNAME,
        port: HTTPS_PORT,
        origin: ALLOWED_ORIGINS,
        certificate: {
            privateKeyPath: PRIVATE_KEY_PATH,
            certificatePath: CERTIFICATE_PATH,
        },
    },
    logs: {
        level: LOG_LEVEL,
        directory: LOGS_DIR,
    },
    jwt: {
        secret: JWT_SECRET,
        expiresIn: JWT_EXPIRES_IN,
    },
    limit: {
        "windowMs": 15 * 60 * 1000,
        "limit": 1,
        "standardHeaders": 'draft-7',
        "legacyHeaders": false,
    },
    sequelize: {
        development: {
            username: DEV_DB_USERNAME,
            password: DEV_DB_PASSWORD,
            database: DEV_DB_NAME,
            host: DEV_DB_HOSTNAME,
            port: DEV_DB_PORT,
            dialect: 'postgres',
            dialectOptions: {
                bigNumberStrings: true,
            },
        },
        test: {
            username: CI_DB_USERNAME,
            password: CI_DB_PASSWORD,
            database: CI_DB_NAME,
            host: '127.0.0.1',
            port: 5432,
            dialect: 'postgres',
            dialectOptions: {
                bigNumberStrings: true,
            },
        },
        production: {
            username: PROD_DB_USERNAME,
            password: PROD_DB_PASSWORD,
            database: PROD_DB_NAME,
            host: PROD_DB_HOSTNAME,
            port: PROD_DB_PORT,
            dialect: 'postgres',
            dialectOptions: {
                bigNumberStrings: true,
                // ssl: {
                //   ca: fs.readFileSync(__dirname + '/ssl/cert.pem'),
                // },
            },
        },
    },
};

export default config;
