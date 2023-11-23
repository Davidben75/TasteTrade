import axios from "axios";
import { useEffect, useState } from "react";
import Icon from "react-icons-kit";
import { NavLink, useParams } from "react-router-dom";
import {edit} from 'react-icons-kit/feather/edit'

const CategoryCard = () => {
    const [recipes, setRecipes] = useState([]);
    
    const {name} = useParams();
    console.log(name)

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/recipe/category/${name}`)
        .then((res) => {
            setRecipes(res.data)
            console.log(res.data)
        });
    }, [name])
    return (
        <>
        <section className="card-container">
        {recipes.map((recipe, index) => 

        
          <article key={index} className="card">
            <figure className="card-body">
              <span className="card-icon">
                <NavLink to={`/modifier/${recipe._id}`}>
                <Icon icon={edit} size={14}/>
                </NavLink>
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

        </section>
        </>
    );
};

export default CategoryCard;