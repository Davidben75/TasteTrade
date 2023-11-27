import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "react-icons-kit";
import { trash2 } from 'react-icons-kit/feather/trash2';
import { edit } from "react-icons-kit/feather/edit";


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
        <section className="admin_detail">
        <h1>Tableau de bord administrateur</h1>
        {recipes &&(
            <table className="table_adimn">
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
                <td className="action">
                  <NavLink to={`/recette/${recipe._id}`}>Voir</NavLink>
                  <NavLink to={`/modifier/${recipe._id}`}> <Icon icon={edit}/>Éditer</NavLink>
                  <button onClick={ (e) => handleDelete(recipe._id, recipe.name)}> <Icon icon={trash2}/> Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}

        <NavLink className="add_recipe_link" to={"/ajout"}>
              Ajouter une nouvelle recette
        </NavLink>
        

        </section>
        
        </>
      
    );
};

export default AdminPage;