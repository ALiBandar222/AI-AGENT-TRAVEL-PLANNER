import { useState } from "react";
import { DESTINATIONS, STYLE_FILTERS } from "../../constants/destinations";

export default function DestinationGrid() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.style === filter);

  return (
    <section className="landing-destinations">
      <div className="landing-section-header">
        <h2>19 Destinations in Our Knowledge Base</h2>
        <p>
          Each destination is embedded in pgvector for semantic search.
          The agent retrieves the best matches for your query.
        </p>
      </div>

      <div className="destination-filters">
        {STYLE_FILTERS.map((f) => (
          <button
            key={f.id}
            className={`destination-filter${filter === f.id ? " destination-filter--active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="destination-grid">
        {filtered.map((dest) => (
          <div key={dest.id} className="destination-card">
            <div
              className="destination-card-header"
              style={{ background: dest.gradient }}
            >
              <span className="destination-emoji">{dest.emoji}</span>
              <span className="destination-style">{dest.style}</span>
            </div>
            <div className="destination-card-body">
              <h3>{dest.name}</h3>
              <p className="destination-country">{dest.country} · {dest.continent}</p>
              <p className="destination-tagline">{dest.tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
