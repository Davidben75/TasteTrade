import User from "../models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// Controller to Login
export const LoginSubmit = async (req, res) => {

    try {
        const {email, password} = req.body
        console.log(req.body)
        let user = await User.findOne({email: email})
        
        if(!user){
            console.error("Nop")
            return res.json("Utilisateur introuvable")
        }
        
        // bcrypt.compareSync() attend deux arguments, le premier la valeur de l'input, le 2e est le hash du mot de passe
        // Il renvoie true ou false
        let passwordCorrect = bcrypt.compareSync(password, user.password) 
        if(!passwordCorrect){
            res.status(400).json("Mot de passe incorrect, try again!")
        }
        
        const token  = jwt.sign({id : user.id}, process.env.JWT_SECRET, {expiresIn : "24h"})


        res.status(200).json({
            id : user._id,
            email : user.email,
            username : user.username,
            role : user.role,
            token : token
        })
        
    } catch (error) {
        res.status(400).json("Impossible de se connecter")
    }       
}

// Controller to create à new user
export const RegisterSubmit = async (req, res) =>  {
    try {
        const {email , username, password} = req.body

        let mailverif = await User.findOne({email : email})
        let usernameverif = await User.findOne({username : username})
        

        if (mailverif){
            return res.json({message : "Cet email existe déja !"})
        }
        if (usernameverif) {
            return res.json({message : "Ce pseudo existe déja !"})
        }

        let newUser = new User({
            email : email,
            username : username,
            password : password,
            // role : "user",
            favoris :[] 
        })

        await newUser.save();

        res.json({message : "Bienvenu parmis nous"})
    } catch (error) {
        res.json({message : "Impossible de vous compter parmis nos membre"})
    }
}

// GET ALLL USERS
export const GetAllUsers = async (req, res) =>{

    try {
        const users = await User.find({}).select('email role createdAt -_id')
    
        if(!users){
            return res.json({message:"Pas d'utilisateur trouvé"})
        }

        // Attention on ne renvoie pas le mot de passe
        console.log(users);
        res.json(users)
        
    } catch (error) {
        res.status(400).json(error)
    }

    
    
    
    
    
}