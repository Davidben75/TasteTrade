import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import recipeRouter from './routes/RecipeRouter.js';
import categoryRouter from './routes/CategoryRouter.js';
import userRouter from './routes/UserRouter.js';



const app = express();

// Load environement variable
dotenv.config();

connectDB

// READ JSON FILES 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// MIDLEWARE
app.use(express.static("public"));

app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}));


app.use(recipeRouter);
app.use(categoryRouter);
app.use(userRouter);

let PORT =  7023 ||  process.env.PORT ;
// SERVEUR CONNECT
app.listen( PORT, () => {
    console.log(`Le serveur est exécuté sur : ${process.env.BASE_URL}`)
    console.log(PORT)
})