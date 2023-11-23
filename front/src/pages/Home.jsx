import { useState, useEffect } from "react";
import {NavLink} from 'react-router-dom'
import axios from "axios";
import {edit} from 'react-icons-kit/feather/edit'
import Icon from "react-icons-kit";
import Category from "../components/Category";


const Home = () => {
    const [recipes, setRecipes] = useState([])

    const capitalize = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
      }
    



    useEffect(() => {
      axios.get(`${process.env.REACT_APP_API}`)
      .then((res) =>{
        setRecipes(res.data)
        console.log(res.data[0].images[0].src)
      })
    },[])
    return (
      <>
      <Category />
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

export default Home;