import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const RecipeDetail = () => {
    const {id} = useParams()
    const [recipe, setRecipe] = useState();

    // FUnction to formate Date
    const formatDate = (dateString) => {
        let parsedDate = Date.parse(dateString);
        let formattedDate = new Date(parsedDate).toLocaleDateString();
        return formattedDate;
    };


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/recipe/${id}`)
        .then((res) => {
            setRecipe(res.data)
            console.log(res.data);
        })
    }, [id])

    return (
        <>
            {recipe && (
                <section className="recipe-detail" style={{"overflowX": "hidden"}}>

                    {/* RECIPE MAIN INFO */}
                    <article>
                        <span className="recipe-detail_header">{recipe.difficulty}</span>
                        <h1 className="recipe-detail_heading">{recipe.name}</h1>
                        <p className="recipe-detail_date">{formatDate(recipe.createdAt)}</p>
                    </article>
                    
                            
                        
                {/* RECIPE CONTENT  */}
                <article className="recipe_detail_content">
                    {/* RECIPE INGREDIENTS & MORE */}
                    <div className="col-12 col-lg-5" data-aos="fade-right" data-aos-easing="linear" data-aos-delay="200">
                        <div className="recipe-detail__box">
                            <div className="recipe-detail__summary">
                                <p> Prépartion : {recipe.time.preparation} mins </p>
                                <p>Cuisson: {recipe.time.cook} mins</p>
                                <p>Temps de repos : {recipe.timerepos} mins</p>
                                <p>Recette pour {recipe.serve} personnes</p>
                            </div>
                            <h2 className="recipe-detail__title">Ingredients</h2>
                            <form className="recipe-detail__check-box">
                                {recipe.ingredients.map((ingredient, index) => 
                                    <ul className="recipe-detail__check-box-list">
                                    <li className="recipe-detail__check-box-item">
                                        <div className="form-group">
                                            <input type="checkbox" name="checkbox" id="box-1"/>
                                            <label htmlFor="box-1" className="square"> {ingredient.amount} de {ingredient.unit} {ingredient.ingredient}</label>
                                        </div>
                                    </li>
                                </ul>
                                )}
                                
                            </form>
                        </div>
                    </div>
                    
                    {/* RECIPE STEPS */}
                    {recipe.steps.map((step, index) => 
                        <ul className="recipe_detail_steps">
                            <li>
                                <h2> étape {index + 1 }</h2>
                                <p>{step}</p>
                            </li>  
                        </ul>
                    )}
                </article>
            
           </section>
            )}
            
        </>
        
    );
};

export default RecipeDetail;