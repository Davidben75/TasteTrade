import express from 'express'
import { AddRecipe, GetAllRecipe, GetOneRecipe,  GetRecipeByCategory, UpdateOneRecipeSubmit } from '../controllers/Recipe.js';
import upload from '../middlewares/multer.js';


const recipeRouter = express.Router();

// RECIPE recipeRouter 
recipeRouter.get("/", GetAllRecipe);

recipeRouter.post("/new", upload.single("images",),AddRecipe);

recipeRouter.get("/recipe/:id", GetOneRecipe);

// UPDATE ONE RECIPE
recipeRouter.post("/recipe/modified/:id", upload.single("images"), UpdateOneRecipeSubmit)

recipeRouter.get("/recipe/category/:name", GetRecipeByCategory);





export default recipeRouter