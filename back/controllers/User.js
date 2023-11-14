import User from "../models/UserModel.js";
import bcrypt from "bcrypt"

// Controller to Login
export const LoginSubmit = async (req, res) => {
    try {
        const {email, password} = req.body
        let user = await User.findOne({email: email})
        
        if(!user){
            return res.jon("Utilisateur introuvable")
        }
        
        // bcrypt.compareSync() attend deux arguments, le premier la valeur de l'input, le 2e est le hash du mot de passe
        // Il renvoie true ou false
        let passwordCorrect = bcrypt.compareSync(password, user.password) 
        if(!passwordCorrect){
            res.json("Mot de passe incorrect, try again!")
        }
        res.json("Super tu es désormais connecté")
        
    } catch (error) {
        res.json("Impossible de se connecter")
    }       
}

// Controller to create à new user
export const RegisterSubmit = async (req, res) =>  {
    try {
        const {email , username, bio, password} = req.body

        let mailverif = await User.findOne({email : email})
        let usernameverif = await User.findOne({username : username})
        

        if (mailverif){
            return res.json({message : "Cet email existe déja !"})
        }
        if (usernameverif) {
            return res.json({message : "Cet pseudo existe déja !"})
        }

        let newUser = new User({
            email : email,
            username : username,
            bio : bio,
            password : password,
            // role : "user",
            favoris :[] 
        })

        newUser.save();

        res.json({message : "Bienvenu parmis nous"})
    } catch (error) {
        res.json({message : "Impossible de vous compter parmis nos membre"})
    }
}