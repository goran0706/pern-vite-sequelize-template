import winston from 'winston';
import config from '../config/config.js';

const {level, directory} = config.logs;
const {createLogger, format, transports} = winston;
const {combine, timestamp, json, printf, colorize, align} = winston.format;

const infoFilter = format((info, opts) => {
    return info.level === 'info' ? info : false;
});

const errorFilter = format((info, opts) => {
    return info.level === 'error' ? info : false;
});

const logger = createLogger({
    level: level,
    format: combine(
        colorize({all: true}),
        timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console(),
        new winston.transports.File({
            filename: `${directory}/combined.log`,
        }),
        new winston.transports.File({
            filename: `${directory}/app-info.log`,
            level: 'info',
            format: combine(infoFilter(), timestamp(), json()),
        }),
        new winston.transports.File({
            filename: `${directory}/app-error.log`,
            level: 'error',
            format: combine(errorFilter(), timestamp(), json()),
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: `${directory}/exception.log`,
        }),
    ],
    rejectionHandlers: [
        new winston.transports.File({
            filename: `${directory}/rejection.log`,
        }),
    ],
});

export default logger;
