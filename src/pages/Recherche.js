import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import Map from "../components/Map";
const Recherche = () => {
    const [search, setSearch] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const getFlag = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-10 -10 3020 2020">
                <g id="French_Flag_by_Adam_Stanislav">
                    <title>Anthony SVG</title>
                    <rect fill="rgb(0%,14%,58%)" x="0" y="0" width="1010" height="2000"/>
                    <rect fill="rgb(97%,97%,97%)" x="1000" y="0" width="1010" height="2000"/>
                    <rect fill="rgb(93%,16%,22%)" x="2000" y="0" width="1000" height="2000"/>
                    <rect fill="none" stroke="rgb(55%,55%,55%)" stroke-width="10" x="0" y="0" width="3000" height="2000"/>
                </g>
            </svg>
        );
    };
    useEffect(() => {
        let searchs;
        async function fetchStart() {
            try {
                searchs = JSON.parse(localStorage.getItem("dataContrats"));
                //faire un like sur searchs filter
                searchs = searchs.filter((searchu) => searchu.name.toLowerCase().includes(search.toLowerCase()));
            }catch (e) {
                console.log(e);
            }
            setSearchResult(searchs);
        }
        fetchStart();
    }, [search]);
    return (
        <div>
            <NavBar/>
            <div className={"container-search"}>
                <h2>Rechercher un contrat</h2>
                <input type="text" id="search-input" placeholder="Recherche" onChange={(e) => setSearch(e.target.value)}/>
                <div className={"container-map-search-result"}>
                    <div className={"container-search-result"}>
                        <div className={"searchResult"}>
                            {searchResult.map((searchR, key) => {return (
                                <div className={"card"} key={key}>
                                    <h2><span className={"flag"}>{getFlag()}</span>{searchR.name}</h2>
                                    <p>{searchR.commercial_name}</p>
                                    <a className={"button"} href={"/carte/" + searchR.name}>Voir les stations sur carte</a>
                                </div>
                            )})}
                        </div>
                    </div>
                    <Map name={search} type={"contrat"}/>
                </div>


            </div>
            </div>

    );
};

export default Recherche;