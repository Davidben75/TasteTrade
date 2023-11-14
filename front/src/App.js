import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import "./css/style.css"
import Test from "./components/Test";
import Home from './pages/Home'
import OneRecipe from "./pages/OneRecipe";
import Modified from "./pages/Modified";




function App() {

  return (

  <>
  <main className="container">
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/ajout"  element={<Test />}/>
    <Route path="/recette/:id" element={<OneRecipe />} />
    <Route path="/modifier/:id" element={<Modified />} />
    <Route path="/register" element={<Register />}/>
  </Routes>
   </main>
  </>

);
}

export default App;
