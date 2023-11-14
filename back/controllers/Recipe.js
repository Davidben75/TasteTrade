import Recipe from "../models/RecipeModel.js"


// Get all Recipe 
export const GetAllRecipe = async(req, res) => {
    try {
        let recipe = await Recipe.find({});
        res.json(recipe);
        console.log(recipe[0])
    } catch (error) {
        console.log("Cannot get all recipe");
    }     
}

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

        const steps = JSON.parse(req.body.steps)
        console.log(steps)

        // Add a new recipe on my DB
        let newRecipe = new Recipe({
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

        await newRecipe.save();

        res.json({message : "Votre recette à bien été ajouté :)"})
        
    } catch (error) {
        res.json({message : "Impossible d'ajouté votre recette  :("})
    }
}

// View One Recipe
export const GetOneRecipe = async (req, res) => {
    const {id} = req.params
    try {

        const recipe = await Recipe.findById(id)
        res.json(recipe)
        
    } catch (error) {
        console.log("Cannot get details params id")
    }
}

// Update One Recipe
export const UpdateOneRecipe = async (req, res) => {
    const {id} = req.params
    try {
        const update = await Recipe.findById(id)
        res.json(update)
        console.log(update)
    } catch (error) {
        console.log('Cannot update')
    }   
}

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

        res.json(editRecipe)
        console.log(editRecipe)
    
    } catch (error) {
        res.json({message : `Impossible de modifier l'article`})
    }
}