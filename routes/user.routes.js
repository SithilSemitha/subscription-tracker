import { Router } from "express";
import { getUsers, getUsersById, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

//GET All users 
userRouter.get('/', getUsers);

//GET Users by id
userRouter.get('/:id', authorize, getUsersById);

//Creating a new user
userRouter.post('/', authorize, createUser);

// Updating a new user
userRouter.put('/:id', authorize, updateUser);

// Deleting a new user
userRouter.delete('/:id', authorize, deleteUser);s

export default userRouter;