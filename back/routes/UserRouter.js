import express from 'express';
import { LoginSubmit, RegisterSubmit } from '../controllers/User.js';

const   userRouter = express.Router();

// USER Router 
userRouter.post("/register", RegisterSubmit);

userRouter.post("/login", LoginSubmit);


export default userRouter;