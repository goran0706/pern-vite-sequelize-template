import express from 'express';
import authCtrl from '../controllers/auth.controller.js';

const {signUp, signIn, signOut} = authCtrl;

const router = express.Router();
router.post('/auth/signUp', signUp);
router.post('/auth/signIn', signIn);
router.get('/auth/signOut', signOut);

export default router;
