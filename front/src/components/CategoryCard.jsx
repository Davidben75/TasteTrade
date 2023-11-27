import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";


const CategoryCard = () => {
    const [recipes, setRecipes] = useState([]);
    
    const {name} = useParams();
    console.log(name)


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
          <RecipeCard recipes={recipes}/>
        </section>
        </>
    );
};

export default CategoryCard;