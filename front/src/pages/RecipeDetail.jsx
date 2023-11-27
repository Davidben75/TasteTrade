import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// eslint-disable-next-line 
import {cutlery} from 'react-icons-kit/fa/cutlery';
// ingredients icons
import {u1F372} from 'react-icons-kit/noto_emoji_regular/u1F372';
// difficulty icon
import {u1F3AF} from 'react-icons-kit/noto_emoji_regular/u1F3AF'
// Time icon
import {u1F552} from 'react-icons-kit/noto_emoji_regular/u1F552'
import Icon from "react-icons-kit";


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
                <section className="recipe_detail" style={{"overflowX": "hidden"}}>

                <h1 className="recipe_detail_heading">{recipe.name}</h1>
                <p className="recipe_detail_date">{formatDate(recipe.createdAt)}</p>
                    {/* RECIPE MAIN INFO */}
                    <article className="recipe_detail_info">

                    <figure className="recipe_detail_image">
                            <img src={`${process.env.REACT_APP_API}/img/recipe/${recipe.images[0].src}`} alt={recipe.name} />
                    </figure>

                        <span className="main_info">
                            <p> <Icon icon={u1F3AF} size={25} className="icons"/> {recipe.difficulty}</p>

                            <ul>
                                <li> <Icon icon={u1F552} size={25} className="icons"/> Prépartion : {recipe.time.preparation ? `${recipe.time.preparation} mins` : "0 min"} </li>
                                <li> <Icon icon={u1F552} size={25} className="icons"/> Cuisson: {recipe.time.cook ? `${recipe.time.cook} mins` : "0 min"}</li>
                                <li> <Icon icon={u1F552} size={25} className="icons"/>Temps de repos : {recipe.time.repos ? `${recipe.time.repos} mins` : "0 min"}</li>
                            </ul>
        
                                 
                        </span>
                        

                        
                        
                    </article>

                    
                    
                            
                        
                {/* RECIPE CONTENT  */}
                <article className="recipe_detail_content">
                    {/* RECIPE INGREDIENTS & MORE */}
                   
                                
                            
                            
                            <form className="recipe_detail_list">
                            
                            <h2 className="recipe_detail_title"> <Icon icon={u1F372} size={25} className="icons"/>Ingredients</h2>
                            <span></span>
                                {recipe.ingredients.map((ingredient, index) => 
                                    <ul key={index} >
                                    <li >
                                        <input type="checkbox" id={index}/>
                                        <label htmlFor={index} >{ingredient.amount} de {ingredient.unit} {ingredient.ingredient}</label>
                                    </li>
                                </ul>
                                )}
                                
                            </form>
                        
              
                    
                    {/* RECIPE STEPS */}
                    
                    <form className="recipe_detail_list">
                    <h2> les étapes à suivre pour cette recette</h2>
                    {recipe.steps.map((step, index) => 
                        <ul className="recipe_detail_steps">
                            <li>
                                <h3> étape {index + 1 }</h3>
                                <label htmlFor={index}>
                                    <input type="checkbox" id={index}/>
                                    {step}
                                </label>   
                            </li>  
                        </ul>
                    
                    )}
                    </form>
                </article>
            
           </section>
            )}
            
        </>
        
    );
};

export default RecipeDetail;