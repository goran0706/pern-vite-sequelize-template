import {Sequelize} from 'sequelize';
import config from '../config/config.js';
import logger from '../utilities/logger.js';

const sequelize = new Sequelize(config.sequelize[config.environment]);

const syncModels = async (modelNames = []) => {
    try {
        await sequelize.sync();
        logger.info('Models and migrations synced successfully.');
    } catch (error) {
        logger.error('Error syncing models:', error);
        throw error;
    }
};

const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        throw error;
    }
};

export default {
    sequelize,
    Sequelize,
    syncModels,
    checkConnection,
};
