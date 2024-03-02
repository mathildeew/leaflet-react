import { stavkirker } from "./dataset/stavkirker";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function App() {
  const mapOptions = {
    center: [61.145215741610265, 8.995954311118219],
    zoom: 0,
    maxZoom: 18,
    minZoom: 5,
  };

  const icon = new Icon({
    iconUrl: "https://img.icons8.com/parakeet/48/church.png",
    iconSize: [35, 35],
    popupAnchor: [0, -20],
  });

  return (
    <main>
      <section className="container">
        <div className="hero">
          <h1>Stavkirker i Norge</h1>
        </div>
        <MapContainer
          {...mapOptions}
          style={{ width: "auto", height: "500px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {stavkirker.map((kirke) => (
            <Marker key={kirke.id} position={kirke.koordinater} icon={icon}>
              <Popup>
                <h2>{kirke.kirke} stavkirke</h2>
                <p>Byggeår: {kirke.byggeår}</p>
                <p>Kommune: {kirke.kommune}</p>
                {kirke.funksjon && <p>{kirke.funksjon}</p>}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>
    </main>
  );
}
