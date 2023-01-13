import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {json} from "react-router";

const Home = () => {


    const [dataStations, setDataStations] = useState([]);
    const [dataContrats, setDataContrats] = useState([]);


    function click(e) {
        e.preventDefault();
        //redirige vers la page de recherche
        window.location.href = "/recherche";
    }


    useEffect( () => {
        async function downloadData() {
            let dataJson;
            let data = await fetch("https://api.jcdecaux.com/vls/v1/contracts?apiKey=7886a12c53604b2668a08582a04795afcc9375b0");
            dataJson = await data.json();
            dataJson = dataJson.filter((contrat) => contrat.country_code === "FR");
            let stations = await fetch("https://api.jcdecaux.com/vls/v3/stations?apiKey=7886a12c53604b2668a08582a04795afcc9375b0");
            let stationsJson = await stations.json();
            //garder les stations qui on a contratname dans dataJson
            stationsJson = stationsJson.filter((station) => dataJson.some((contrat) => contrat.name === station.contractName));
            setDataContrats(dataJson);
            setDataStations(stationsJson);
        }
        downloadData()
    }, []);


    useEffect(() => {
        //mettre en localstorage les données
        localStorage.setItem("dataContrats", JSON.stringify(dataContrats));
        localStorage.setItem("dataStations",JSON.stringify(dataStations));
    }, [dataContrats, dataStations]);


    return (
        <home>
            <NavBar/>
            <section>
                <h1>Bienvenue sur le site de jcdecaux.com <bug>Hacked</bug></h1>
                <button onClick={click}>Commencer !</button>
            </section>
        </home>
    );
};

export default Home;