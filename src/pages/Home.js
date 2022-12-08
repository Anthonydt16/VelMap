import React from 'react';
import NavBar from "../components/NavBar";

const Home = () => {
    function click(e) {
        e.preventDefault();
        //redirige vers la page de recherche
        window.location.href = "/recherche";
    }

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