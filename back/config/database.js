import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

const connectDB = mongoose.connect(process.env.DB_URI)
    .then(() => console.log(`Connect to your database`))
    .catch((error) => console.log(error));

export default connectDB