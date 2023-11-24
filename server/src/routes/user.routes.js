import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const {requireAuthAndAuthorization} = authCtrl;
const {get, create, byId, getById, update, remove} = userCtrl;
const baseURL = '/api/users';
const specificURL = `${baseURL}/:userId`;

const router = express.Router();
router.use(specificURL, requireAuthAndAuthorization);
router.param('userId', byId);
router.route(baseURL).get(get).post(create);
router.route(specificURL).get(getById).put(update).delete(remove);

export default router;
