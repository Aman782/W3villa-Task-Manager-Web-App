import express from 'express';
import { registerUser, loginUser, logoutUser, userInfo } from '../controllers/user.controllers.js';
import { verifyJWT } from '../middlewares/authentication.js';
import { createNewTask, deletedTask, getTasks, updateTask } from '../controllers/task.controllers.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logoutUser);
router.get('/user-info', verifyJWT, userInfo);
router.post('/new-task', verifyJWT, createNewTask);
router.get('/get-tasks', verifyJWT, getTasks);
router.post('/update-task', verifyJWT, updateTask);
router.post('/delete-task', verifyJWT, deletedTask);


export default router;
