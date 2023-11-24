import {DataTypes} from 'sequelize';
import db from './index.js';
import {comparePassword, generateHashSync, generateSaltSync,} from '../utilities/auth.utils.js';

const User = db.sequelize.define(
    'User',
    {
        firstName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            set(pwd) {
                // Set the virtual password for temporary use (not stored in the database)
                this.setDataValue('password', pwd);
                // Hash the password before saving it to the database
                const salt = generateSaltSync(10);
                const hash = generateHashSync(pwd, salt);
                this.setDataValue('passwordHashed', hash);
            },
        },
        passwordHashed: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        gender: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        dateOfBirth: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        contactNumber: {
            type: DataTypes.STRING,
        },
        role: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: 'guest',
        },
    },
    {
        defaultScope: {
            attributes: {exclude: ['password', 'passwordHashed']},
        },
    }
);

// Custom method to compare a plain text password with the hashed password
User.prototype.authenticate = async function (password) {
    return await comparePassword(password, this.passwordHashed);
};

export default User;
