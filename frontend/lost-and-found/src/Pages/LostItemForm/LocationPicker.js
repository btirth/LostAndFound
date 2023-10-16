// LocationPicker.js
import React, { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'


const defaultCenter = [44.653707240893, -63.59127044677735]; // Set your initial latitude and longitude

const customIcon= new Icon({
        iconUrl:require("./../../Assets/Images/location-pin.png"),
        iconSize:[38,38]
    }
)

const Search = (props) => {
    const map = useMap() // access to leaflet map
    const { provider } = props

    useEffect(() => {
        const searchControl = new GeoSearchControl({
            provider,
        })

        map.addControl(searchControl) // this is how you add a control in vanilla leaflet
        map.remove();
        return () => map.removeControl(searchControl)
        
    }, [props])
    // useEffect(() => {
    //     const provider = new OpenStreetMapProvider();
    
    //     const searchControl = new GeoSearchControl({
    //       provider,
    //       marker: {
    //         customIcon
    //       }
    //     });
    
    //     map.addControl(searchControl);
    
    //     return () => map.removeControl(searchControl)
    //   }, []);
    

    return null // don't want anything to show up from this comp

    
}


const LocationPicker = ({ onLocationChange }) => {
    const [position, setPosition] = React.useState(defaultCenter);
    const [selectedPosition, setSelectedPosition] = useState([0,0]);


    const Markers = () => {

        const map = useMapEvents({
            click(e) {

                console.log(e.latlng.lat,e.latlng.lng)
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
            },
        })

        return (
            selectedPosition ?
                <Marker
                    key={selectedPosition[0]}
                    position={selectedPosition}
                    icon={customIcon}
                    interactive={false}
                />
                : null
        )

    }

    return (
        <MapContainer center={defaultCenter} zoom={12} style={{ height: '400px', width: '400px' }} >
            {/* <Markers/> */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Search provider={new OpenStreetMapProvider()} />
            {/* <Marker position={position}>
        <Popup>Selected Location</Popup>
      </Marker> */}
        </MapContainer>
    );
};

export default LocationPicker;
