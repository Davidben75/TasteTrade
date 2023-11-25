import Recipe from "../models/RecipeModel.js"


// Get all Recipe 
export const GetAllRecipe = async(req, res) => {
    try {
        let recipe = await Recipe.find({});
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).send({message : error.message || "Error all recipe "})
    }     
};

// Add Recipe 
export const AddRecipe = async (req, res) => {
    try {

        const {
            name,
            category, 
            difficulty,
            ingredients, 
            serve,
            description, 
            time,
            profile,
            note 
        } = req.body;

        const steps = JSON.parse(req.body.steps);
        
        let newRecipe;

        // Add a new recipe on my Blog 
        if(req.file){
            newRecipe = new Recipe({
                name : name,
                category : category,
                difficulty : difficulty,
                ingredients : ingredients,
                serve : serve,
                time : time,
                description : description,
                steps : steps,
                profile : profile,
                note : note,
                images : {
                    src : req.file.filename,
                    alt : req.file.originalname
                }
            })
        } else {
            newRecipe = new Recipe({
                name : name,
                category : category,
                difficulty : difficulty,
                ingredients : ingredients,
                serve : serve,
                time : time,
                description : description,
                steps : steps,
                profile : profile,
                note : note,
                images : {
                    src : "",
                    alt : ""
                }
        })}
        

        await newRecipe.save();

        res.status(200).json({message : "Votre recette à bien été ajouté :)"})
        
    } catch (error) {
        res.status(400).json({message : "Impossible d'ajouté votre recette  :("})
        console.log(error)
    }
}

// Update one recipe
export const UpdateOneRecipeSubmit = async (req, res) => {
    const {id} = req.params
    try {
        const {
            name,
            category, 
            difficulty,
            ingredients, 
            serve,
            description, 
            time,
            profile,
            note 
        } = req.body;

        const steps = JSON.parse(req.body.steps)

        console.log(req.body)
        console.log(id)

        
        let editRecipe = {
            name : name,
            category : category,
            difficulty : difficulty,
            ingredients : ingredients,
            serve : serve,
            time : time,
            description : description,
            steps : steps,
            profile : profile,
            note : note,
            images : {
                src : req.file.filename,
                alt : req.file.originalname
            }
        }

        await Recipe.updateOne({_id : id}, editRecipe)

        res.status(200).json(editRecipe)
        console.log(editRecipe)
    
    } catch (error) {
        res.status(400).json({message : `Impossible de modifier l'article`})
        console.log(error)
    }
};

// Delete one recipe
export const DeleteOneRecipe = async (req, res) => {
    const { _id } = req.body;
    try {
        const deleteRecipe = await Recipe.deleteOne({ _id: _id });

        if (!deleteRecipe.deletedCount) {
            return res.status(404).json({ message: "Recette introuvable" });
        }

        res.status(200).json({ message: "Recette supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erreur lors de la suppression de la recette" });
    }
};

// Get recipe by category 
export const GetRecipeByCategory = async (req, res) => {
    const {name} = req.params
    console.log(name)
    try {
        const recipe = await Recipe.find({category : name});
        res.status(200).json(recipe);
        
    } catch (error) {
        res.status(400).json({message : "Impossible de voir les recettes " + name})
    }
    
};

// View One Recipe
export const GetOneRecipe = async (req, res) => {
    const {id} = req.params
    try {

        const recipe = await Recipe.findById(id)
        res.status(200).json(recipe)
        
    } catch (error) {
        res.status(400)
        console.log(error)
    }
};