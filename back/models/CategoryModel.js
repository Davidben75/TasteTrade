import mongoose from "mongoose";


let categorySchenma = mongoose.Schema({
    name : {
        type : String,
        lowercase : true
    },
    image : {
        type : String
    }
},{
    timestamps : true
})

let Category = mongoose.model("Category", categorySchenma);

export default Category