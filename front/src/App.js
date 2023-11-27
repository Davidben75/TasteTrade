import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./css/style.css"
import "./css/admin/admin.css" 
import "./css/card/card.css"
import "./css/from_user/form_user.css"
import "./css/recipe_details/recipe_details.css"
import Home from './pages/Home'
import Modified from "./pages/Modified";
import OneCategory from "./pages/OneCategory";
import RecipeDetail from "./pages/RecipeDetail";
import NewRecipe from "./pages/NewRecipe";
import AdminPage from "./pages/Admin/AdminPage";
import { useState } from "react";
import AdminPageUsers from "./pages/Admin/AdminPageUsers";




function App() {
  // eslint-disable-next-line
  const [isLoged , setIsLoged] = useState(false)
  // eslint-disable-next-line
  const [isAdmin , setIsAdmin] = useState(false)

  return (

  <>
  <main className="container">
  <Routes>
    {/* Admin Routes */}
    <Route path="/data/admin/recipes" element={<AdminPage/>}/>
    <Route path="/data/admin/users" element={<AdminPageUsers/>}/>

    {/* Users Route */}
    
    <Route path="/" element={<Home/>} />
    <Route path="/ajout"  element={<NewRecipe />}/>
    
    <Route path="/recette/:id" element={<RecipeDetail />} />
    <Route path="/modifier/:id" element={<Modified />} />
    <Route path="/page/inscription" element={<Register />}/>
    <Route path="/page/connexion" element={<Login/>}/>
    <Route path="/:name/:id" element={<OneCategory />}/>
  </Routes>
   </main>
  </>

);
}

export default App;
