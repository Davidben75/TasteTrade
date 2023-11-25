import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import "./css/style.css"
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
    <Route path="/register" element={<Register />}/>
    <Route path="/:name/:id" element={<OneCategory />}/>
  </Routes>
   </main>
  </>

);
}

export default App;
