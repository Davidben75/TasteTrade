import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"

export const isLogged = (req, res, next) => {

    // On va extraire le token du headers
    let authToken = req.headers.authorization;
    let token = authToken && authToken.split(" ")[1];
    
    console.log("token extrait: " + token);
    
    if(!token){
        return  res.json({message: "Vous n'êtes pas authentifié"})
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    
    if(err){
        console.log(err)
        return res.json({message: "Vous n'êtes pas autorisé à accéder à cette page"})
        
    }
    
    req.userId = decoded.id
    
    next();
    
    } )
    
};

export const isAdmin = async (req, res, next) => {

    const user = await User.findById(req.userId)

    if(!user){
        return res.json({message: "Aucun utilisateur trouvé avec cet ID"})
    }

    if(user.role !== "admin"){
        return res.json({message: "Vous devez être administrateur pour accéder à cette ressource"})
    }

    next();
    return;

};