import { useState, useEffect } from "react";
import { stavkirker } from "./dataset/stavkirker";
import LeafletMap from "./components/Map";

export default function App() {
  const [kirker, setKirker] = useState(stavkirker);
  const [searched, setSearched] = useState("");

  function onSearch(e) {
    setSearched(e.target.value);
  }

  useEffect(() => {
    const filteredKirker = stavkirker.filter((kirke) =>
      kirke.navn.toLowerCase().includes(searched.toLowerCase())
    );

    setKirker(filteredKirker);
  }, [searched]);

  return (
    <main>
      <div className="hero">
        <h1>Stavkirker i Norge</h1>
      </div>
      <section className="container">
        <input
          name="search"
          placeholder="Søk"
          type="search"
          onChange={onSearch}
          value={searched}
        />
        <LeafletMap data={kirker} />
      </section>
    </main>
  );
}
