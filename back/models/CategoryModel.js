import mongoose from "mongoose";


let categorySchenma = mongoose.Schema({
    name : String,
    icon : String,
    bg_img : String
},{
    timestamps : true
})

let Category = mongoose.model("Category", categorySchenma);

export default Category