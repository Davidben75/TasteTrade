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
import AdminPageUsers from "./pages/Admin/AdminPageUsers";
import NotFound from "./pages/NotFound";




function App() {
  
  
  
  const user = JSON.parse(localStorage.getItem("user"))





  console.log("User Role:", user ? user.role : "No user found"); 

  return (

  <>
  <main className="container">
  <Routes>
    {/* Admin Routes */}
    {user && user.role === "admin" ? (
      <>
      <Route path="/data/admin/recipes" element={<AdminPage/>}/>
      <Route path="/data/admin/users" element={<AdminPageUsers/>}/>
      </>
    ) : (
      ""
    )}
    
      <Route path="*" element={<NotFound/>}/>

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
