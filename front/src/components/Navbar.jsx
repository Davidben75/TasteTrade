import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const [active, setActive] = useState("nav-menu");
  const [icon, setIcon] = useState("nav-toggler");

  const user = JSON.parse(localStorage.getItem("user"));

  const navToggle = () => {
    if (active === "nav-menu") {
      setActive("nav-menu nav-active");
    } else setActive("nav-menu");

    // Icon Toggler
    if (icon === "nav-toggler") {
      setIcon("nav-toggler toggle");
    } else setIcon("nav-toggler");
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setIsAdmin(false);
    setIsLogged(false);
  };

  useEffect(() => {
    if(!user) {
      return;
    }
    switch (user?.role) {
      case "user":
        setIsLogged(true);
        setIsAdmin(false);
        break;
      case "admin":
        setIsAdmin(true);
        setIsLogged(true);
        break;
      default:
        setIsAdmin(false);
        setIsLogged(false);
        break;
    }
  }, [user, isAdmin, isLogged]);
  
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
          <NavLink to="#" className="nav-link">
            À propos
          </NavLink>
        </li>

        {isAdmin ? 
          <li className="nav-item">
            <NavLink to={"/data/admin/recipes"} className="nav-link">
              Page Admin
            </NavLink>
          </li>
        : ""}

        {isLogged ? (
          <>
            <li className="nav-item login-btn">
              <NavLink to={"/"} onClick={handleLogOut} className="nav-link">
                Se déconnecter
              </NavLink>
            </li>
            <li>Hey {user.username} !</li>
          </>
        ) : (
          <>
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
          </>
        )}

      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
