import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


const AdminPage = () => {
    const [recipes, setRecipes] = useState();

    // DELETE RECIPE
    const handleDelete = async (recipeId, recipeName) => {
        try {
          const deleteRecipe = {_id : recipeId}
          
          if(window.confirm(`Voulez vraiment supprimer cette recette ${recipeName}?`)){
            await axios.post(`${process.env.REACT_APP_API}/delete`,  deleteRecipe);
            const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
            setRecipes(updatedRecipes);
            alert("Recette bien supprimer ! ")
          }
          
    
          
        } catch (error) {
          // Gérez les erreurs de suppression
          console.error('Erreur lors de la suppression de la recette:', error);
        }
      };

    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}`)
        .then((res) => {
            setRecipes(res.data)
        })
    },[recipes]);
    


    return (
        <>
        <h1>Tableau de bord administrateur</h1>
        {recipes &&(
            <table>
          <thead>
            <tr>
              <th>Nom de la recette</th>
              <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={index}>
                <td>{recipe.name}</td>
                <td>{recipe.createdAt}</td>
                <td>
                  <NavLink to={`/recette/${recipe._id}`}>Voir</NavLink>{' '}
                  <NavLink to={`/modifier/${recipe._id}`}>Éditer</NavLink>{' '}
                  <button onClick={ (e) => handleDelete(recipe._id, recipe.name)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        
        </>
      
    );
};

export default AdminPage;