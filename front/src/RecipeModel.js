import mongoose from "mongoose";

let recipeSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true,
    },
    category : {
        type : String,
        enum: ["Facile", "Moyen", "Difficile", "Extrême"],
        required : true,
    },
    author : {
        type : mongoose.Types.ObjectId, ref : "User"
    },
    difficulty :{
        type : String,
        required : true,
        lowercase : true
    },
    ingredients : [
        {
        name_list : {
            type : String,
            lowercase : true
        },
        list : [
            {
            amount : {
                type : Number,
                required : true
            },
            name : {
                type: String,
                lowercase : true,
                required : true
            },
            unit : {
                type : String,
                lowercase : true
            }
            }
        ]}
    ],
    serve : {
        type : Number,
        required : true
    },
    time : {
        preparation : Number,
        repos : Number,
        cuisson : Number,
    },
    description : {
        type : String,
        lowercase : true
    },
    steps : {
        type : Array,
        required : true
    },
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
    images : Array,
    rating : Number,
    note : String
},{
    timestamps : true
})

let Recipe = mongoose.model("Recipe", recipeSchema)

export default Recipe