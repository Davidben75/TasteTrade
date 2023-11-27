import { useState, useEffect } from "react";
import axios from "axios";
import Category from "../components/Category";
import RecipeCard from "../components/RecipeCard";


const Home = () => {
    const [recipes, setRecipes] = useState([])


  


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
        <RecipeCard recipes={recipes}/>    
      </section>
      </>
    );
};

export default Home;