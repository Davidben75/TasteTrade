import express from 'express'
import { AddRecipe, GetAllRecipe, GetOneRecipe,  UpdateOneRecipe,  UpdateOneRecipeSubmit } from '../controllers/Recipe.js';
import { LoginSubmit, RegisterSubmit } from '../controllers/User.js';
import upload from '../middlewares/multer.js';


const router = express.Router();

// RECIPE ROUTER 
router.get("/", GetAllRecipe);

router.post("/new", upload.single("images",),AddRecipe);

router.get("/recipe/:id", GetOneRecipe);

// UPDATE ONE RECIPE
router.post("/recipe/modified/:id", upload.single("images"), UpdateOneRecipeSubmit)

// USER ROUTER 
router.post("/register", RegisterSubmit)

router.post("/login", LoginSubmit)

export default router