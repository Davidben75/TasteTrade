import express from 'express'
import { GetAllCategories, GetOneCategory } from '../controllers/Category.js';


const categoryRouter = express.Router()

// CATEGORY ROUTERS 
categoryRouter.get("/category" , GetAllCategories);

categoryRouter.get("/category/:id", GetOneCategory);


export default categoryRouter;