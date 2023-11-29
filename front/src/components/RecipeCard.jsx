import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'react-icons-kit';
import { edit } from 'react-icons-kit/feather/edit';
import { trash2 } from 'react-icons-kit/feather/trash2';
import Saved from './Saved';

const RecipeCard = ({recipes}) => {

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return (
        <>
        {recipes.map((recipe, index) => 
        
            <article key={index} className="card">
              <figure className="card-body">
                <span className="card-icon">
                  <Saved/>
                </span>
                <img className="card-image" src={`${process.env.REACT_APP_API}/img/recipe/${recipe.images[0].src}`} alt={`${process.env.REACT_APP_API}/img/${recipe.images[0].alt}`} />
  
                <figcaption>
                <h2 className="card-title">{recipe.name.toUpperCase()}</h2>
                <p className="card-description">{capitalize(recipe.description)}</p>
                <NavLink className="card-button" to={`/recette/${recipe._id}`}> Voir la recette</NavLink>         
              </figcaption>
              </figure>
  
            </article>
          )}
          </>
    );
};

export default RecipeCard;