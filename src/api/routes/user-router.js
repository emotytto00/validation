import express from 'express';
import { getAllUsers, getUserById, addUser, updateUser, deleteUser } from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers);

userRouter.route('/:id').get(getUserById);

userRouter.route('/').post(addUser);

userRouter.route('/:id').put(updateUser);

userRouter.route('/:id').delete(deleteUser);

export default userRouter;
