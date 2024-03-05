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
  const churches = data;
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

  const icons = {
    churchIcon: {
      iconUrl: "https://img.icons8.com/parakeet/48/church.png",
      iconSize: [35, 35],
      popupAnchor: [0, -20],
    },
    burnedIcon: {
      iconUrl: "https://img.icons8.com/office/16/fire-element--v1.png",
      iconSize: [35, 35],
      popupAnchor: [0, -20],
    },
  };

  const getCategoryIcon = (category) => {
    if (category === "Nedbrent") {
      return new Icon(icons.burnedIcon);
    } else {
      return new Icon(icons.churchIcon);
    }
  };

  const churchesWithIcon = churches.map((church) => {
    return {
      ...church,
      icon: getCategoryIcon(church.category),
    };
  });

  return (
    <MapContainer {...mapOptions} style={mapStyle}>
      <LayersControl position="topright">
        {layers.map((layerName) => (
          <LayersControl.Overlay
            key={layerName}
            checked={layerName === "Bevarte"}
            name={layerName}
          >
            <LayerGroup>
              {churchesWithIcon
                .filter((church) => church.exist === (layerName === "Bevarte"))
                .map((church) => (
                  <Marker
                    key={church.id}
                    position={church.coordinates}
                    icon={church.icon}
                  >
                    <Popup>
                      <h2>{church.name} stavkirke</h2>
                      <p>Byggeår: {church.year}</p>
                      <p>Kommune: {church.commune}</p>
                      {church.function && <p>{church.function}</p>}
                    </Popup>
                  </Marker>
                ))}
            </LayerGroup>
          </LayersControl.Overlay>
        ))}
      </LayersControl>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}
