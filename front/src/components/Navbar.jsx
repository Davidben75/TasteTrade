import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ()  => {
    const [active, setActive] = useState("nav-menu");
    const [icon, setIcon] = useState("nav-toggler");
    const navToggle = () => {
      if (active === "nav-menu") {
        setActive("nav-menu nav-active");
      } else setActive("nav-menu");
  
      // Icon Toggler
      if (icon === "nav-toggler") {
        setIcon("nav-toggler toggle");
      } else setIcon("nav-toggler");
    };
    return (
      <nav className="nav">
        <span className="logo-container">
            <NavLink to={"/"} className="nav-brand logo">
                Taste Trade
            </NavLink>
        </span>
        
        <ul className={active}>
          <li className="nav-item">
            <NavLink to={"/"} className="nav-link">
              Accueil
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink href="#" className="nav-link">
                à propos
            </NavLink>
          </li>
          <li className="nav-item login-btn">
            <NavLink to={"/page/connexion"} className="nav-link">
              Se connecter
            </NavLink>
          </li>
          <li className="nav-item signup-btn">
            <NavLink to={"/page/inscription"} className="nav-link ">
              S'inscrire
            </NavLink>
          </li>
          
        </ul>
        <div onClick={navToggle} className={icon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;