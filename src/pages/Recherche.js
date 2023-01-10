import React, {useEffect, useState} from 'react';

const Recherche = () => {
    const [search, setSearch] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        let searchs;
        async function fetchStart() {
            try {
                searchs = await fetch("https://api.jcdecaux.com/vls/v1/contracts?apiKey=7886a12c53604b2668a08582a04795afcc9375b0");
                searchs = await searchs.json();
                searchs = searchs.filter((searchu) => searchu.country_code === "FR");
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
            Recherche
            <input type="text" id="search-input" placeholder="Recherche" onChange={(e) => setSearch(e.target.value)}/>
            <div className={"searchResult"}>
                {searchResult.map((searchR, key) => {return (
                    <div className={"card"} key={key}>
                        <h2>{searchR.name}</h2>
                        <span>{searchR.country_code}</span>
                        <p>{searchR.commercial_name}</p>
                        <a className={"button"} href={"/carte/" + searchR.name}>Voir les stations sur carte</a>
                    </div>
                )})}
            </div>
        </div>
    );
};

export default Recherche;