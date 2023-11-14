import mongoose from "mongoose";

let recipeSchema = mongoose.Schema({
    name : {
        type : String,
        lowercase : true,
    },
    category : {
        type : String,
        enum: ["entrée" , "plat", "dessert"],
    },
    author : {
        type : mongoose.Types.ObjectId, ref : "User",
    },
    difficulty :{
        type : String,
        enum: ["facile", "moyen", "difficile", "extrême"],
        lowercase : true
    },
    ingredients : [
            {
            amount : {
                type : Number,
            },
            ingredient : {
                type: String,
                lowercase : true,
            },
            unit : {
                type : String,
                lowercase : true
            }
            }
    ],
    serve : {
        type : Number,
    },
    time : {
        preparation : Number,
        repos : Number,
        cook : Number,
    },
    description : {
        type : String,
    },
    steps : Array,
    profile : {
        vegetarian : {
            type : Boolean,
            default : false
        },
        gluten_free : {
            type : Boolean,
            default : false
        },
        lazy : {
            type : Boolean,
            default : false
        },
        dairy_free : {
            type : Boolean,
            default : false
        },
        fish : {
            type : Boolean,
            default : false
        },
        salad : {
            type : Boolean,
            default : false
        },
        vegan : {
            type : Boolean,
            default : false
        },
        meat : {
            type : Boolean,
            default : false
        }
    },
    images : [{
        src : String,
        alt : String
    }],
    rating : Number,
    note : String,
    comments : [{
        pseudo : String,
        comment : String,
        date : Date
    }],
},{
    timestamps : true
})

let Recipe = mongoose.model("Recipe", recipeSchema)

export default Recipe