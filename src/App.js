import './App.css';
import React, {useState}  from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import parkData from "./data/data.json";

function App() {
  const [activePark, setActivePark] = useState(null);
  const icon = new Icon({
    iconUrl: "/placeicon.svg",
    iconSize: [25, 25]
  });

  return ( 
    <MapContainer center={[49.27556, -123.12006]} zoom={12} scrollWheelZoom={false}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />
  {parkData.features.map(park => (
        <Marker
          key={park.properties.SITE_ID}
          position={[
            park.geometry.coordinates[1],
            park.geometry.coordinates[0]
          ]}
          eventHandlers={{
            click: (e) => {
              setActivePark(park);
            },
          }}
          
          icon={icon}

        />
        ))}

      {activePark && (
        <Popup
          position={[
            activePark.geometry.coordinates[1],
            activePark.geometry.coordinates[0]
          ]}

        >
          <div>
            <h2>{activePark.properties.NAME}</h2>
            <p>Pay to use: {activePark.properties.PAID}</p>
            <p>Address: {activePark.properties.ADDRESS}</p>
          </div>
        </Popup>
      )}
</MapContainer>
  );
}

export default App;