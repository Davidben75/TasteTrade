import {NavLink} from 'react-router-dom'

const Header = () => {
    return (
        <>
            
        <header className="header">
        <div className="container header-container navbar">

            <nav className="home-page header-left" aria-label="Retour sur la page d'accueil"> 
                <NavLink to={"/"}  className="logo">Taste Trade </NavLink>
            </nav>

            <nav className="header-right">

                <ul className="nav-links">
                    <li className="nav-links-btn"><NavLink to={"/"}>Accueil</NavLink ></li>
                    <li className="nav-links-btn"><NavLink to={"/ajout"}>À propos</NavLink ></li>
                </ul>

                <ul className="nav-authentifications">
                    <li className="login-btn"><NavLink href="#">Se connecter 
                    </NavLink> </li>
                    <li className="sign-up-btn"><NavLink to={"/register"}>S'inscrire</NavLink></li>
                </ul>
            </nav>
        </div>
        

    </header>
        </>
    );
};

export default Header;