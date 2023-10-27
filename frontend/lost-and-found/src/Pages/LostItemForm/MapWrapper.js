import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import { Icon } from 'leaflet'
import { Button,Card } from "react-bootstrap";
import { XLg,XCircle } from 'react-bootstrap-icons'




// Cordinates of Halifax
const center = [44.653707240893, -63.59127044677735];


const customIcon = new Icon({
    iconUrl: require("./../../Assets/Images/location-pin.png"),
    iconSize: [38, 38]
}
)



function LeafletgeoSearch(props) {
    // const [locations, setLocations] = useState([]);
    const locations = props.locations
    const setLocations = props.setLocationsFun

    const addLocation = (newLocation) => {
        setLocations([...locations, newLocation]);
    };

    const map = useMap();
    map.on('geosearch/showlocation', function (event) {
        const { location } = event;
        const { label, x, y } = location;
        addLocation({ "lng": x,"lat": y, "label": label })

    });
    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        const searchControl = new GeoSearchControl({
            provider,
            showMarker: false,
        });


        map.addControl(searchControl);



        return () => map.removeControl(searchControl);
    }, []);

    return (
        <div>
            {locations.map((coordinate, index) => (
                <Marker key={index} position={[coordinate.lat, coordinate.lng]} icon={customIcon}>
                    <Popup key={index}>{coordinate.label}</Popup>
                </Marker>
            ))}
            {locations.map((coordinate, index) => (
                <Circle key={index} radius={100} center={[coordinate.lat, coordinate.lng]} icon={customIcon} >
                </Circle>
            ))}
        </div>
    );
}


function MapWrapper(props) {

    const locations = props.locations
    const setLocations = props.setLocationsFun

    // const [locations, setLocations] = useState([]);

    const removeElement = (index) => {
        const updatedList = [...locations];
        updatedList.splice(index, 1);
        setLocations(updatedList);
    };

    return (
        <div>
            <div id="mapid" >
                <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ width: '900px', height: '400px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LeafletgeoSearch locations={locations} setLocationsFun={setLocations} />
                </MapContainer>
            </div>
            <div style={{ width: '900px'}}>
                <h5>Pinned Locations:</h5>
                <ul style={{ textAlign: center }}>
                    {locations.map((location, index) => (
                        <Card className='border shadow pl-2 pr-2'>
                            <li key={index}>
                                Address: {location.label}
                                <Button className="ml-1" style={{ backgroundColor: "white", height:"10xp",width:"10xp", border: "1px solid white"}} onClick={() => removeElement(index)}>
                                    <XCircle style={{ color: "black" }} />
                                </Button>
                            </li>
                        </Card>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export default MapWrapper;
