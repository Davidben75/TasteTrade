import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB = mongoose.connect(process.env.DB_URI);

mongoose.connection.on("open", () => {
    console.log("Connexion avec la BDD effectuée")
});

mongoose.connection.on("error", () => {
    console.log("Connexion impossible à la BDD")
});

export default connectDB