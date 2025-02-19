import express from 'express';
import { registerUser, loginUser, logoutUser, userInfo } from '../controllers/user.controllers.js';
import { verifyJWT } from '../middlewares/authentication.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logoutUser);
router.get('/user-info', verifyJWT, userInfo);
export default router;
