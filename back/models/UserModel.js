import mongoose from "mongoose";
import bcrypt from "bcrypt"


let userSchema=mongoose.Schema({
    email : {
        type :String,
        unique: true,
        lowercase: true,
        required : true
    },
    username : {
        type :String,
        unique: true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : "user"
    },
    favoris : [{
        type : mongoose.Schema.Types.ObjectId, ref : "recipes",
    }]
},{
    timestamps : true
})

// Mongoose hook before save this hook hash my password
userSchema.pre('save' , function (next) {
    if(!this.isModified('password')){
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10)

    next();
})

let User = mongoose.model("User", userSchema);

export default User