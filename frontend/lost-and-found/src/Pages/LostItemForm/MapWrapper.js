import React, { useState,useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import { Icon } from 'leaflet'

// Cordinates of Halifax
const center = [44.653707240893, -63.59127044677735];
const purpleOptions = { color: "white" };


const customIcon= new Icon({
    iconUrl:require("./../../Assets/Images/location-pin.png"),
    iconSize:[38,38]
}
)


function LeafletgeoSearch() {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      marker: {
        customIcon
      }
    });
    console.log("searchControl",searchControl);

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, []);

  return null;
}

class MapWrapper extends React.Component {
  render() {
    return (
        <div id="mapid">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '400px', width: '400px' }}
        >
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          />
          <LeafletgeoSearch />
        </MapContainer>
      </div>
    );
  }
}

export default MapWrapper;
