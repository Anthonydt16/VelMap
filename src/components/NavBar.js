import React from 'react';
import {NavLink} from "react-router-dom";
const NavBar = () => {
    return (
        <navbar>
            <NavLink to="/" className={(nav) => nav.isActive ? "nav-active" : ""}><li>Accueil</li></NavLink>
            <NavLink to="/recherche" className={(nav) => nav.isActive ? "nav-active" : ""}><li>Recherche</li></NavLink>
            <NavLink to="/carte" className={(nav) => nav.isActive ? "nav-active" : ""}><li>Carte</li></NavLink>
        </navbar>
    );
};

export default NavBar;