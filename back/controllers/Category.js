import Category from "../models/CategoryModel.js";

export const GetAllCategories = async (req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).json(category);
        
    } catch (error) {
        res.status(400).send({message : error.message || "Error all categories "});
    }
}; 

// Get one category
export const GetOneCategory = async (req, res) => {
    const {id} = req.params
    try {

        const category = await Category.findById(id)
        res.status(200).json(category)
        
    } catch (error) {
        console.log(error)
        res.status(400)
    }
};