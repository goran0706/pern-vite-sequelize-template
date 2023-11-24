import express from 'express';
import postCtrl from '../controllers/post.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const {requireAuthAndAuthorization} = authCtrl;
const {get, create, byId, getById, update, remove} = postCtrl;
const baseURL = '/api/users/:userId/posts';
const specificURL = `${baseURL}/:postId`;

const router = express.Router();
router.use(baseURL, requireAuthAndAuthorization);
router.use(specificURL, requireAuthAndAuthorization);
router.param('postId', byId);
router.route(baseURL).get(get).post(create);
router.route(specificURL).get(getById).put(update).delete(remove);

export default router;
