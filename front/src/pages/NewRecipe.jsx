import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    name: "",
    category: "entrée",
    difficulty: "- -",
    ingredients: [{ amount: 0, ingredient: "", unit: "" }],
    serve: 1,
    time: { preparation: 0, repos: 0, cook: 0 },
    description: "",
    steps: [""],
    profile: [],
    note: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "preparation" || name === "repos" || name === "cook") {
      return setRecipeData((prevRecipe) => ({
        ...prevRecipe,
        time: { ...prevRecipe.time, [name]: value },
      }));
    }
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleImagesChange = (e) => {
    const files = e.target.files;
    setImage(files);
  };

  const handleProfileChange = (e) => {
    const { name, checked } = e.target;
    console.log(checked);
    setRecipeData((prevRecipe) => ({
      ...prevRecipe,
      profile: { ...prevRecipe.profile, [name]: checked },
    }));
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    let updateIngredients = [...recipeData.ingredients];
    updateIngredients[index] = { ...updateIngredients[index], [name]: value };
    setRecipeData({ ...recipeData, ingredients: updateIngredients });

  };

  const handleStepChange = (e, index) => {
    const { value } = e.target;
    setRecipeData(prevRecipeData => {
      const updatedSteps = [...prevRecipeData.steps];
      updatedSteps[index] = value;
      return { ...prevRecipeData, steps: updatedSteps };
    });
  };

  const addIngredient = (e) => {
    e.preventDefault();
    setRecipeData({
      ...recipeData,
      ingredients: [
        ...recipeData.ingredients,
        { amount: "", ingredient: "", unit: "" },
      ],
    });
  };

  const addStep = (e) => {
    e.preventDefault();
    const updatedSteps = [...recipeData.steps];
    updatedSteps.push("");
    setRecipeData({
      ...recipeData,
      steps: updatedSteps,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    
    if(recipeData.profile.length === 0){
        return console.log("c'est vide")
    }
    
    const formData = new FormData();

    for (let key in recipeData) {

        if(key === "steps"){
            formData.append('steps', JSON.stringify(recipeData.steps))
            continue;
        }

        if (Array.isArray(recipeData[key])) {    
            recipeData[key].forEach((item, index) => {
                for (let itemKey in item) {
                    formData.append(`${key}[${index}][${itemKey}]`, item[itemKey]);
                }
            });
        } else if (typeof recipeData[key] === 'object') {
            // Gestions des objet comme time
            for (let subKey in recipeData[key]) {
            formData.append(`${key}[${subKey}]`, recipeData[key][subKey]);
            }
        } else {
            formData.append(key, recipeData[key]);
        }
    }  
    formData.append('images', image[0])

    
    await axios.post(`${process.env.REACT_APP_API}/new`, formData)
        .then((res) => {
            alert("Recette bien enregistrée")
            navigate("/")
        })
};

  return (

    <form className="from_recipe" onSubmit={handleSubmit} method="post" encType="multipart/form-data">
      {/* RECIPE NAME */}
      <div>
        <label>Nom de la recette:</label>
        <input
          type="text"
          name="name"
          value={recipeData.name}
          onChange={handleInputChange}
        />
      </div>

      {/* RECIPE CATEGORY */}
      <div>
        <label>Catégorie:</label>
        <select
          name="category"
          value={recipeData.category}
          onChange={handleInputChange}
        >
          <option value="entrée">Entrée</option>
          <option value="plat">Plat</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>

      {/* RECIPE DIFFICULTY*/}
      <div>
        <label>Niveau de difficulté:</label>
        <select
          name="difficulty"
          value={recipeData.difficulty}
          onChange={handleInputChange}
        >
          <option value="null"> - - </option>
          <option value="facile">Facile</option>
          <option value="moyen">Moyen</option>
          <option value="difficile">Difficile</option>
          <option value="extrême">Extrême</option>
        </select>
      </div>

      <div>
        <label>Ingrédients:</label>
        {recipeData.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="number"
              min={0}
              name="amount"
              value={ingredient.amount}
              onChange={(e) => handleIngredientChange(e, index)}
            />

            <select
              name="unit"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(e, index)}
            >
              {["- -", "kg", "g", "mg", "l", "cl", "ml", "c.à.s"].map(
                (unit, unitIndex) => (
                  <option key={unitIndex} value={unit}>
                    {unit}
                  </option>
                )
              )}
            </select>

            <input
              type="text"
              name="ingredient"
              placeholder="Ingrédient"
              value={ingredient.ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
            />
          </div>
        ))}
        <button onClick={addIngredient}>Ajouter un ingrédient</button>
      </div>

      <div>
        <label>Nombre de portions : </label>
        <input
          type="number"
          min={0}
          name="serve"
          value={recipeData.serve}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h1>Temps (en minutes)</h1>

        <label> Préparation : </label>
        <input
          type="number"
          min={0}
          placeholder="Préparation (minutes)"
          name="preparation"
          value={recipeData.time.preparation}
          onChange={handleInputChange}
        />

        <br />

        <label> Repos : </label>
        <input
          type="number"
          min={0}
          placeholder="Repos (minutes)"
          name="repos"
          value={recipeData.time.repos}
          onChange={handleInputChange}
        />

        <br />

        <label>Cuisson : </label>
        <input
          type="number"
          min={0}
          name="cook"
          value={recipeData.time.cook}
          onChange={handleInputChange}
        />
        <br />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={recipeData.description}
          onChange={handleInputChange}
        />
      </div>

      <div>
        {recipeData.steps.map((step, index) => (
          <div key={index}>
            <label>
              Etape {index + 1}
              <input
                type="text"
                value={step}
                placeholder={`Étape ${index + 1}`}
                onChange={(e) => handleStepChange(e, index)}
              />
            </label>
          </div>
        ))}
        <button onClick={addStep}>Ajouter une étape</button>
      </div>

      <div>
        <span>
          Type de consommation :
          {[
            "vegetarian",
            "gluten_free",
            "lazy",
            "dairy_free",
            "fish",
            "salad",
            "vegan",
            "meat",
          ].map((oneProfile, i) => (
            <label key={i} name="profile">
              <input
                type="checkbox"
                name={oneProfile}
                onChange={handleProfileChange}
              />
              {oneProfile}
            </label>
          ))}
        </span>
      </div>
      <div>
        {/* Gérer l'ajout d'images ici (par exemple, avec react-dropzone) */}
      </div>

      <div>
        <label>Note:</label>
        <input
          type="text"
          name="note"
          value={recipeData.note}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label> Image </label>
        <input
          type="file"
          name="images"
          onChange={handleImagesChange}
          multiple
          accept="/images"
        />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          Ajouter la recette
        </button>
      </div>
    </form>
  );
};

export default NewRecipe;
