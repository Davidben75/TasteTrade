import express from 'express'
import { AddRecipe, DeleteOneRecipe, GetAllRecipe, GetOneRecipe,  GetRecipeByCategory, UpdateOneRecipeSubmit } from '../controllers/Recipe.js';
import upload from '../middlewares/multer.js';


const recipeRouter = express.Router();

//  ALL RECIPES 
recipeRouter.get("/", GetAllRecipe);

// ONE RECIPES
recipeRouter.get("/recipe/:id", GetOneRecipe);

// CREATE RECIPE
recipeRouter.post("/new", upload.single("images",),AddRecipe);

// DELETED RECIPE
recipeRouter.post("/delete", DeleteOneRecipe)

// UPDATE ONE RECIPE
recipeRouter.post("/recipe/modified/:id", upload.single("images"), UpdateOneRecipeSubmit)

recipeRouter.get("/recipe/category/:name", GetRecipeByCategory);





export default recipeRouter