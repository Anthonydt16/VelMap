
import React, {useRef,useCallback} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import {Marker, Popup,} from "react-leaflet";
import {useEffect, useState} from 'react';
import NavBar from "./NavBar";
import {map} from "leaflet/src/map";
//avec une api on récupere toutes les stations et recupere dans un tableau X, Y les corordonnées de chaque station
//puis on les affiche sur la carte

const Map = ( {name, type} ) => {
    let zoom = 10;
    let stations;
    let contrats;
    let marker= [];
    let position;
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
    function printMarkerContrats() {
        if (name.length > 0) {
            contrats = JSON.parse(localStorage.getItem("dataContrats")).filter((contrat) => contrat.name.toLowerCase().includes(name.toLowerCase()) );

            console.log(contrats);
            contrats.map((contrat) => {
                //récuperer la postion long et lat de leurs premiere stations
                stations = JSON.parse(localStorage.getItem("dataStations")).filter((station) => station.contractName === contrat.name);
                console.log(stations[0]);
                position = [stations[0].position.latitude, stations[0].position.longitude];
                marker.push(
                    <Marker position={position}>
                        <Popup>
                            <h2><span className={"flag"}>{getFlag()}</span>{contrat.name}</h2>
                            <p>{contrat.commercial_name}</p>
                        </Popup>
                    </Marker>
                );
            });
        }else{
            contrats = JSON.parse(localStorage.getItem("dataContrats"));
            contrats.map((contrat) => {
                //récuperer la postion long et lat de leurs premiere stations
                stations = JSON.parse(localStorage.getItem("dataStations")).filter((station) => station.contractName === contrat.name);
                position = [stations[0].position.latitude, stations[0].position.longitude];
                marker.push(
                    <Marker position={position}>
                        <Popup>
                            <h2><span className={"flag"}>{getFlag()}</span>{contrat.name}</h2>
                            <p>{contrat.commercial_name}</p>
                        </Popup>
                    </Marker>
                );
            });
        }

    }
    function printMarkerStations() {
        stations= JSON.parse(localStorage.getItem("dataStations")).filter((station) => station.contractName === name);

        stations.map((station, key) => {
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

    }
    if (type == "station") {
        printMarkerStations();
        zoom = 14;
        position = [stations[0].position.latitude , stations[0].position.longitude]
    }else if (type === "contrat") {
        zoom = 5;
        printMarkerContrats();
    }


    return (
        <map>

            <MapContainer id={"map"} className={"map"} center={position} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {marker}
            </MapContainer>
        </map>
    );
};

export default Map;