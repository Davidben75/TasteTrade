import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./css/style.css"
import "./css/admin/admin.css" 
import "./css/card/card.css"
import "./css/from_user/form_user.css"
import Home from './pages/Home'
import Modified from "./pages/Modified";
import OneCategory from "./pages/OneCategory";
import RecipeDetail from "./pages/RecipeDetail";
import NewRecipe from "./pages/NewRecipe";
import AdminPage from "./pages/AdminPage";




function App() {

  return (

  <>
  <main className="container">
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/ajout"  element={<NewRecipe />}/>
    <Route path="/data/admin" element={<AdminPage/>}/>
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
