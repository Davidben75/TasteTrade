import express from 'express';
import { GetAllUsers, LoginSubmit, RegisterSubmit } from '../controllers/User.js';
import { isAdmin, isLogged } from '../middlewares/auth.js';

const   userRouter = express.Router();

// USER Router 
userRouter.post("/register", RegisterSubmit);

userRouter.post("/login", LoginSubmit);

userRouter.get("/all/users", isLogged, isAdmin, GetAllUsers)


export default userRouter;