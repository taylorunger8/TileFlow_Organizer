import { useEffect, useState } from "react";

type Tile = {
  id: number;
  name: string;
  sku: string;
  material: string;
  size: string;
  color: string;
  finish: string;
  zone: string;
  bay: string;
  side: string;
  section: number;
  level: string;
  slot: number;
};

export default function App() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("");

  async function loadAll() {
    setStatus("Loading...");
    try {
      const res = await fetch("http://127.0.0.1:8000/tiles");
      const data = (await res.json()) as Tile[];
      setTiles(data);
      setStatus(`Showing ${data.length} tile(s)`);
    } catch {
      setStatus("ERROR: Can't reach backend (is uvicorn running on 8000?)");
    }
  }

  async function search() {
    const query = q.trim();

    // If the box is empty, show all tiles again
    if (!query) {
      await loadAll();
      return;
    }

    setStatus("Searching...");
    setTiles([]); // makes it obvious the click did something

    try {
      const url = `http://127.0.0.1:8000/tiles?q=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      const data = (await res.json()) as Tile[];
      setTiles(data);
      setStatus(`Found ${data.length} result(s) for "${query}"`);
    } catch {
      setStatus("ERROR: Search failed (backend/CORS)");
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Tile Demo</h1>

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or SKU..."
          style={{ padding: 10, width: "100%", maxWidth: 420 }}
        />
        <button onClick={search} style={{ padding: "10px 14px" }}>
          Search
        </button>
        <button onClick={loadAll} style={{ padding: "10px 14px" }}>
          Reset
        </button>
      </div>

      <div style={{ marginBottom: 12, color: "#555" }}>{status}</div>

      {tiles.map((t) => (
        <div key={t.id} style={{ marginBottom: 10 }}>
          <strong>{t.name}</strong>

          <div>
          SKU {t.sku} • {t.material} • {t.size} • {t.color} • {t.finish}
          </div>

          <div>
          Location: {t.side === "F" ? "Front" : "Rear"} • Section {t.section} • {t.level === "T" ? "Top" : "Bottom"} slot {t.slot}
          </div>
        </div>
      ))}
    </div>
  );
}