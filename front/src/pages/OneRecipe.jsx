import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const OneRecipe = () => {
    const {id} = useParams()
    const [recipe, setRecipe] = useState()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/recipe/${id}`)
        .then((res) => {
            setRecipe(res.data)
            console.log(res.data)
        })
    }, [id])

    return (
        <>
            {recipe && (
                <h2>{recipe.name}</h2>
            )}
        </>
        
    );
};

export default OneRecipe;