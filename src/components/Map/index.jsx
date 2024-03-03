import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LeafletMap(data) {
  const { data: kirker } = data;

  const mapOptions = {
    center: [61.145215741610265, 8.995954311118219],
    zoom: 0,
    maxZoom: 18,
    minZoom: 5,
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

  const kirkeArray = kirker.map((kirke) => {
    return {
      ...kirke,
      icon: getCategoryIcon(kirke.kategori),
    };
  });

  console.log(kirkeArray);

  return (
    <div>
      <MapContainer {...mapOptions} style={{ width: "auto", height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {kirkeArray.map((kirke) => (
          <Marker key={kirke.id} position={kirke.koordinater} icon={kirke.icon}>
            <Popup>
              <h2>{kirke.navn} stavkirke</h2>
              <p>Byggeår: {kirke.byggeår}</p>
              <p>Kommune: {kirke.kommune}</p>
              {kirke.funksjon && <p>{kirke.funksjon}</p>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
