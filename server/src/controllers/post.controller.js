import Post from '../models/post.model.js';
import {handleRequest, handleRequestById,} from './handlers/request.handlers.js';

const get = async (req, res) => {
    await handleRequest(Post.findAll(), 200, res);
};

const create = async (req, res) => {
    const {userId} = req.params;
    const newPost = req.body;
    await handleRequest(Post.create({...newPost, userId}), 201, res);
};

const byId = async (req, res, next) => {
    const {postId} = req.params;
    await handleRequestById(Post.findByPk(postId), 'post', req, res, next);
};

const getById = async (req, res) => {
    const {post} = req;
    await handleRequest(Promise.resolve(post), 200, res);
};

const update = async (req, res) => {
    const {post, body: updatePost} = req;
    await handleRequest(post.update(updatePost), 200, res);
};

const remove = async (req, res) => {
    const {post} = req;
    await handleRequest(Post.destroy({where: {id: post.id}}), 200, res);
};

export default {
    get,
    byId,
    getById,
    create,
    update,
    remove,
};
