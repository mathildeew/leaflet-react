import { useState } from "react";
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

export default function LeafletMap({ data }) {
  const kirker = data;
  const [layers, setLayers] = useState(["Bevarte", "Tapte kirke"]);

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

  const getCategoryIcon = (kategori) => {
    if (kategori === "Nedbrent") {
      return burnedIcon;
    } else {
      return churchIcon;
    }
  };

  const kirkerWithIcon = kirker.map((kirke) => {
    return {
      ...kirke,
      icon: getCategoryIcon(kirke.kategori),
    };
  });

  return (
    <div>
      <MapContainer {...mapOptions} style={mapStyle}>
        <LayersControl position="topright">
          {layers.map((layerName) => (
            <LayersControl.Overlay
              key={layerName}
              checked={layerName === "Bevarte"}
              name={layerName}
            >
              <LayerGroup>
                {kirkerWithIcon
                  .filter(
                    (kirke) => kirke.eksisterer === (layerName === "Bevarte")
                  )
                  .map((kirke) => (
                    <Marker
                      key={kirke.id}
                      position={kirke.koordinater}
                      icon={kirke.icon}
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
