import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const Modified = () => {
    const {id} = useParams()

    const [recipeData, setRecipeData] = useState({
        name : "",
        category : "",
        difficulty: 'facile',
        ingredients: [{ amount: '', ingredient: '', unit: '' }],
        serve: "",
        time: { preparation: "", repos: "", cook: "" },
        description: '',
        steps: [''],
        profile: [],
        note: '',
    })

    const units = ["- -", "kg", "g", "mg", "l", "cl", "ml", "c.à.s", "c.à.c"];

    const profiles = ["vegetarian","gluten_free","lazy","dairy_free","fish","salad","vegan","meat",]
    

    const [images, setImages] = useState(null)
   

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/recipe/${id}`)
        .then((res) => {
            
            setRecipeData(res.data)
            console.log(res.data.ingredients)
        })
    }, [id])

    const handleInputChange = (e) =>{
        const {name, value} = e.target
       setRecipeData({...recipeData, [name]:value})
    }

    const handleIngredientChange = (e, index) => {
        const {name, value} = e.target
        // We create a copy of our array ingredients
        const updateIngredients = [...recipeData.ingredients];
        // We update the value depending on the index
        updateIngredients[index] = {...updateIngredients[index], [name]:value}
        setRecipeData({...recipeData, ingredients : updateIngredients} )
        
    }

    const handleStepChange = (e, index) => {
        const { value} = e.target;
        setRecipeData(prevRecipeData => {
            const updatedSteps = [...prevRecipeData.steps];
            updatedSteps[index] = value;
            return { ...prevRecipeData, steps: updatedSteps };
        });
    }

    const handleProfileChange = (e) => {
        const {name, checked} = e.target
        setRecipeData((prev) => ({...prev, profile: {...prev.profile, [name]:checked}}))
    }

    const handleImagesChange = (e) => {
        setImages(e.target.files)
    }
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
        formData.append('images', images[0])
    
        
        await axios.post(`${process.env.REACT_APP_API}/recipe/modified/${id}`, formData)
            .then((res) => {
                console.log(res.data)
                console.log(formData)
                console.log(id)
            })
    };


    return (
        <>
        
        <form  method="post" onSubmit={handleSubmit} encType="multipart/form-data">
            { /* INPUT FOR RECIPE NAME */} 
            <label> Nom de la recette :
                <input 
                type="text"  
                name="name" 
                value={recipeData.name} 
                onChange={handleInputChange}
                />
            </label>

            <br />
            { /* INPUT FOR CATEGORY */} 
            <label>Catégorie de la recette :

                <select name="category" 
                value={recipeData.category} 
                onChange={handleInputChange}>

                <option value="entrée">Entrée</option>
                <option value="plat">Plat</option>
                <option value="dessert">Dessert</option>
                </select>
            </label>

            <br />
            { /* INPUT FOR DIFFICULTY */} 
            <label> Niveau de difficulté :

                <select 
                name="difficulty" 
                value={recipeData.difficulty} 
                onChange={handleInputChange}>

                    <option>  -- </option>
                    <option value="facile">Facile</option>
                    <option value="moyen">Moyen</option>
                    <option value="difficile">Difficile</option>
                    <option value="extrême">Extrême</option>
                </select>
            </label>

            { /* INPUTS FOR INGREDIENTS */} 
            <label > Ingrédients : 
                {recipeData.ingredients.map((ingredient, index) =>
                    <span key={index}>
                    <input 
                    type="number"
                    min={0}
                    name="amount"
                    value={ingredient.amount} 
                    onChange={(e) => handleIngredientChange(e, index)}/>

                    <select 
                    name="unit" 
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(e, index)}>
                        {units.map((unit, unitIndex) => 
                            <option key={unitIndex} value={unit}>{unit}</option>
                        )}
                    </select>

                    <input 
                    type="text"
                    name="ingredient"
                    value={ingredient.ingredient} 
                    onChange={(e) => handleIngredientChange(e, index)}/>
                    </span>
        
                )}
                
            </label>
            <button onClick={addIngredient}>Ajouter un ingrédient</button>
            <br />

           { /* INPUT FOR SERVE */}              
            <label>
                <input 
                type="number" 
                name="serve"
                min={0}
                value={recipeData.serve} 
                onChange={handleInputChange}
                />
            </label>

            <br />
            
            {/* INPUTS FOR TIMES */}
            <span>
                <p>Temps en minutes :</p>

                <label htmlFor="preparation"> Préparation :
                    <input
                    type="number"
                    min={0}
                    name="preparation"
                    value={recipeData.time.preparation}
                    onChange={handleInputChange}
                    />
                </label>


                <label > Repos :
                    <input
                    type="number"
                    min={0}
                    name="repos"
                    value={recipeData.time.repos}
                    onChange={handleInputChange}
                    />
                </label>

                <label htmlFor="cook"> Cuisson : 
                    <input
                    type="number"
                    min={0}
                    name="cook"
                    value={recipeData.time.cook}
                    onChange={handleInputChange}
                    />
                </label>
            </span> 

            <br />
            
            {/* INPUTS FOR DESCRIPTION */}
            <label> Description :
                <textarea name="description"  
                cols="10" 
                rows="10"
                value={recipeData.description}
                onChange={handleInputChange}
                />
            </label>

            <br />
            {/* INPUTS FOR STEPS */}
            <span> 
                <p> Les étapes à suivre :</p>
                {recipeData.steps.map((step, index) => 
                    <label> Étape {index + 1}
                        <input 
                        type="text" 
                        value={step || ""}
                        onChange={(e) => handleStepChange(e, index)}
                        />
                    </label>
                )}
                <button onClick={addStep}>Ajouter une étape</button>
            </span> 

            <br /> 
            
            
            {/* CHECKBOX FOR  TYPE OF FOODS*/}
            <span>
                <p>Type de consommation :</p>
                {profiles.map((profile, index) =>
                <label key={index} name="profile">
                    <input 
                    type="checkbox"
                    name={profile}
                    onChange={handleProfileChange}
                    />
                    {profile}
                    </label>
                )}
            </span>
    
            <label>Note:
                <input
                type="text"
                name="note"
                value={recipeData.note}
                onChange={handleInputChange}
                />
            </label>  

            <label> Image 
                <input 
                type="file"
                name='images'
                onChange={handleImagesChange}
                multiple 
                />  
            </label>
       

            
            
            
            


                    
            <button type="submit">
                modifier
            </button>
            
        </form>
            
        </>
    );
};

export default Modified;