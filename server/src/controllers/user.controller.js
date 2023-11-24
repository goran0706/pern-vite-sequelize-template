import User from '../models/user.model.js';
import {handleRequest, handleRequestById,} from './handlers/request.handlers.js';

const get = async (req, res) => {
    await handleRequest(User.findAll(), 200, res);
};

const create = async (req, res) => {
    const newUser = req.body;
    await handleRequest(User.create(newUser), 201, res);
};

const byId = async (req, res, next) => {
    const {userId} = req.params;
    await handleRequestById(User.findByPk(userId), 'user', req, res, next);
};

const getById = async (req, res) => {
    const {user} = req;
    await handleRequest(Promise.resolve(user), 200, res);
};

const update = async (req, res) => {
    const {user, body: updateUser} = req;
    const fields = [
        'name',
        'surname',
        'password',
        'passwordHashed',
        'gender',
        'dateOfBirth',
        'contactNumber',
    ];
    await handleRequest(user.update(updateUser, {fields}), 200, res);
};

const remove = async (req, res) => {
    const {user} = req;
    await handleRequest(user.destroy(), 204, res);
};

export default {
    get,
    byId,
    getById,
    create,
    update,
    remove,
};
