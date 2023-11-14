import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import PostRouter from './routes/PostRouter.js';


const app = express();

// Load environement variable
dotenv.config();

connectDB

// READ JSON FILES 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// MIDLEWARE
app.use(express.static("public"));

app.use(cors())


app.use(PostRouter)

// SERVEUR CONNECT
app.listen(process.env.PORT, () => {
    console.log(`Le serveur est exécuté sur : ${process.env.BASE_URL}`)
})