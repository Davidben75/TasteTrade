import express from 'express';
import { GetAllUsers, GetSavedRecipes, LoginSubmit, RegisterSubmit, SavedRecipe, UserSavedRecipes } from '../controllers/User.js';
import { isAdmin, isLogged } from '../middlewares/auth.js';

const   userRouter = express.Router();

// USER Router 
userRouter.post("/register", RegisterSubmit);

userRouter.post("/login", LoginSubmit);

userRouter.get("/all/users", isLogged, isAdmin, GetAllUsers)

userRouter.put("/favorite", SavedRecipe)

userRouter.get("/favorite/ids", GetSavedRecipes)

userRouter.get("/favorite/recipe", UserSavedRecipes)


export default userRouter;