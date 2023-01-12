import React from 'react';
import Map from "../components/Map";
import {useParams} from "react-router";
import NavBar from "../components/NavBar";

const Carte = () => {
    //récuperer le nom dans l'url
    const {name} = useParams();
    return (
        <carte>
            <NavBar/>
            <h2>La cartes de toutes les stations</h2>
            <Map name={name} type={"station"}/>
        </carte>
    );
};

export default Carte;