
import React, {useRef,useCallback} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import {Marker, Popup,} from "react-leaflet";
import L from 'leaflet';
import {useEffect, useState} from 'react';
import NavBar from "./NavBar";
import {map} from "leaflet/src/map";
//avec une api on récupere toutes les stations et recupere dans un tableau X, Y les corordonnées de chaque station
//puis on les affiche sur la carte


const Map = () => {
    const [markersContrat, setMarkersContrat] = useState([]);
    const [markersStation, setMarkersStation] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [contrats, setContrats] = useState([]);
    const [stations, setStations] = useState([]);


    useEffect(() => {
        let marker = [];
        async function fetchStart() {
            let marker = [];
            let contratsJson;
            try {
                let contratss = await fetch("https://api.jcdecaux.com/vls/v1/contracts?apiKey=7886a12c53604b2668a08582a04795afcc9375b0");
                contratsJson = await contratss.json();
            }catch (e) {
                console.log(e);
            }
            if (contratsJson.length > 0) {
                let contratFilter = contratsJson.filter((contrat) => contrat.country_code === "FR");
                console.log(contratFilter);
                for (const contratUnit of contratFilter) {
                    console.log(contratUnit.name);
                    let stations = await fetch("https://api.jcdecaux.com/vls/v3/stations?contract=" + contratUnit.name + "&apiKey=7886a12c53604b2668a08582a04795afcc9375b0");
                    let stationsJson = await stations.json();
                    //on ajoute la longitude et latitude
                    contratUnit["longitude"] = stationsJson[0].position.longitude;
                    contratUnit["latitude"] = stationsJson[0].position.latitude;
                    //ajouter les modif des contrat
                    contratFilter.filter((contrat) => contrat.name === contratUnit.name)['longitude'] = stationsJson[0].position.longitude;
                    contratFilter.filter((contrat) => contrat.name === contratUnit.name)['latitude'] = stationsJson[0].position.latitude;
                    setContrats(contratFilter);
                    setStations(stationsJson);
                    if (!contratUnit.latitude || !contratUnit.longitude) {
                        console.log("pas de position");
                        return null;
                    }// ignorez les stations sans coordonnées
                    else {
                        marker.push(<Marker key={contratUnit.name} position={[contratUnit.latitude, contratUnit.longitude]}><Popup><p>le nom: {contratUnit.name}</p><p>le pays: {contratUnit.country_code}</p><p>le nom commercial: {contratUnit.commercial_name}</p></Popup></Marker>);
                    }
                }

            }else{
                console.log("pas de contrat");
            }
            setContrats(contratsJson);
            setMarkersContrat(marker);
        }
        fetchStart();
    }, []);

    useEffect(() => {
        async function fetchStart() {
            let marker = markersStation;
            stations.map((station, key) => {
                //ajouter sans les doublons
                marker.push(
                    <Marker key={key} position={[station.position.latitude, station.position.longitude]}>
                        <Popup>
                            <p>le nom: {station.name}</p>
                            <p>adresse: {station.address}</p>
                            <p>status: {station.status}</p>
                            <p>total de vélos: {station.totalStands.availabilities.bikes}</p>
                            <p>total de vélos électriques: {station.totalStands.availabilities.mechanicalBikes}</p>
                            <p>total de vélos mécaniques: {station.totalStands.availabilities.electricalBikes}</p>
                        </Popup>
                    </Marker>
                )

            })
            setMarkersStation(marker);
        }
        fetchStart();
    }, [stations]);


    const position = [46.00, 2.00]

    function contrat() {
        console.log(markers)
        console.log("contrat");
        setMarkers(markersContrat);
        console.log(markers);
    }

    function station() {
        console.log(markers)
        setMarkers(markersStation);
        console.log(markers);
    }

    return (
        <map>
            <NavBar/>
            <h2>La cartes de toutes les stations</h2>
            <div>
                <span onClick={station}>Station</span>
                <span onClick={contrat}>Contrat</span>
            </div>
            <MapContainer id={"map"} className={"map"} center={position} zoom={2} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers}
            </MapContainer>
        </map>
    );
};

export default Map;