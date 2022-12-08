import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import {Marker, Popup} from "react-leaflet";
import L from 'leaflet';
import {useEffect, useState} from 'react';
import NavBar from "./NavBar";
//avec une api on récupere toutes les stations et recupere dans un tableau X, Y les corordonnées de chaque station
//puis on les affiche sur la carte

const Map = () => {
    const [markers, setMarkers] = useState([]);
    const [contrats, setContrats] = useState([]);


    useEffect(() => {
        async function fetchData() {
            let markers = [];
            let contratss = await fetch("https://api.jcdecaux.com/vls/v1/contracts?apiKey=7886a12c53604b2668a08582a04795afcc9375b0");
            let contratsJson = await contratss.json();
            setContrats(contratsJson.filter((contrat) => contrat.country_code === "FR"));
            for (const contratUnit of contrats) {
                let stations = await fetch("https://api.jcdecaux.com/vls/v3/stations?contract=" + contratUnit.name + "&apiKey=7886a12c53604b2668a08582a04795afcc9375b0");
                let stationsJson = await stations.json();
                 markers.push(stationsJson.map((station) => {
                    if (!station.position || !station.position.latitude || !station.position.longitude) {
                        return null;
                    }// ignorez les stations sans coordonnées
                    else {
                        return (
                            <Marker position={[station.position.latitude, station.position.longitude]}>
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
                    }
                }));
            }
            setMarkers(markers);
        }
        fetchData();
    }, [markers, contrats]);


    const position = [46.00, 2.00]
    return (
        <map>
            <NavBar/>
            <h2>La cartes de toutes les stations</h2>
            <MapContainer className={"map"} center={position} zoom={2} scrollWheelZoom={true}>
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