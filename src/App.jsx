import { useState, useEffect } from "react";
import { stavkirker } from "./dataset/stavkirker";
import LeafletMap from "./components/Map";

export default function App() {
  const [churches, setChurches] = useState(stavkirker);
  const [searched, setSearched] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");

  const onSearch = (e) => {
    setSearched(e.target.value);
  };

  const onCountyChange = (e) => {
    setSelectedCounty(e.target.value);
  };

  useEffect(() => {
    const filteredChurches = stavkirker.filter(
      (church) =>
        church.name.toLowerCase().includes(searched.toLowerCase()) &&
        (!selectedCounty || church.county === selectedCounty)
    );

    setChurches(filteredChurches);
  }, [searched, selectedCounty]);

  const counties = [...new Set(stavkirker.map((church) => church.county))];

  return (
    <main>
      <div className="hero">
        <h1>Stavkirker i Norge</h1>
      </div>
      <div className="container">
        <div className="controls">
          <input
            name="search"
            placeholder="Søk"
            type="search"
            onChange={onSearch}
            value={searched}
          />
          <select onChange={onCountyChange} value={selectedCounty}>
            <option value="">Alle fylker</option>
            {counties.map((county) => (
              <option key={county}>{county}</option>
            ))}
          </select>
        </div>

        <LeafletMap data={churches} />
      </div>
    </main>
  );
}
