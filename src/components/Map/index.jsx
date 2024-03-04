import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

export default function LeafletMap({ data }) {
  const kirker = data;
  const [visibleLayers, setVisibleLayers] = useState([
    "Bevarte",
    "Tapte kirke",
  ]);

  const mapOptions = {
    center: [61.145215741610265, 8.995954311118219],
    zoom: 0,
    maxZoom: 18,
    minZoom: 5,
  };

  const mapStyle = {
    width: "auto",
    height: "500px",
  };

  const churchIcon = new Icon({
    iconUrl: "https://img.icons8.com/parakeet/48/church.png",
    iconSize: [35, 35],
    popupAnchor: [0, -20],
  });

  const burnedIcon = new Icon({
    iconUrl: "https://img.icons8.com/office/16/fire-element--v1.png",
    iconSize: [35, 35],
    popupAnchor: [0, -20],
  });

  return (
    <div>
      <MapContainer {...mapOptions} style={mapStyle}>
        <LayersControl position="topright">
          {visibleLayers.map((layerName) => (
            <LayersControl.Overlay
              key={layerName}
              checked={layerName === "Bevarte"}
              name={layerName}
            >
              <LayerGroup>
                {kirker
                  .filter(
                    (kirke) => kirke.eksisterer === (layerName === "Bevarte")
                  )
                  .map((kirke) => (
                    <Marker
                      key={kirke.id}
                      position={kirke.koordinater}
                      icon={kirke.eksisterer ? churchIcon : burnedIcon}
                    >
                      <Popup>
                        <h2>{kirke.navn} stavkirke</h2>
                        <p>Byggeår: {kirke.byggeår}</p>
                        <p>Kommune: {kirke.kommune}</p>
                        {kirke.funksjon && <p>{kirke.funksjon}</p>}
                      </Popup>
                    </Marker>
                  ))}
              </LayerGroup>
            </LayersControl.Overlay>
          ))}
        </LayersControl>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}
