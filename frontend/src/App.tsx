import { useEffect, useMemo, useState } from "react";

const API = "http://127.0.0.1:8000";

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

type SortOption = "name-asc" | "name-desc" | "bay-asc" | "material-asc";

export default function App() {
  const [allTiles, setAllTiles] = useState<Tile[]>([]);
  const [q, setQ] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [bay, setBay] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(() => {
    async function loadTiles() {
      const res = await fetch(`${API}/tiles`);
      const data = await res.json();
      setAllTiles(data);
    }

    loadTiles();
  }, []);

  const filteredTiles = useMemo(() => {
    if (!hasSearched) return [];

    let filtered = [...allTiles];

    if (q.trim() !== "") {
      const query = q.trim().toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.sku.toLowerCase().includes(query)
      );
    }

    if (material !== "") {
      filtered = filtered.filter((t) => t.material === material);
    }

    if (color !== "") {
      filtered = filtered.filter((t) => t.color === color);
    }

    if (size !== "") {
      filtered = filtered.filter((t) => t.size === size);
    }

    if (bay !== "") {
      filtered = filtered.filter((t) => t.bay === bay);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "bay-asc":
          return a.bay.localeCompare(b.bay);
        case "material-asc":
          return a.material.localeCompare(b.material);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allTiles, q, material, color, size, bay, sortBy, hasSearched]);

  function searchTiles() {
    setHasSearched(true);
  }

  function resetFilters() {
    setQ("");
    setMaterial("");
    setColor("");
    setSize("");
    setBay("");
    setSortBy("name-asc");
    setHasSearched(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      searchTiles();
    }
  }

  const activeFilters = [
    q.trim() ? `Search: ${q.trim()}` : null,
    material ? `Material: ${material}` : null,
    color ? `Color: ${color}` : null,
    size ? `Size: ${size}` : null,
    bay ? `Bay: ${bay}` : null,
  ].filter(Boolean);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#efe7dc",
        padding: 30,
        fontFamily: "system-ui, sans-serif",
        color: "black",
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <h1 style={{ marginBottom: 10, fontSize: 64, fontWeight: 700 }}>
          TileFlow
        </h1>

        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 14,
            marginBottom: 20,
            boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search by name or SKU..."
              style={{
                padding: 10,
                minWidth: 220,
                background: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: 8,
              }}
            />

            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              style={{
                padding: 10,
                background: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: 8,
              }}
            >
              <option value="">Material</option>
              <option value="porcelain">Porcelain</option>
              <option value="ceramic">Ceramic</option>
            </select>

            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                padding: 10,
                background: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: 8,
              }}
            >
              <option value="">Color</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="gray">Gray</option>
              <option value="beige">Beige</option>
              <option value="multicolored">Multicolored</option>
            </select>

            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              style={{
                padding: 10,
                background: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: 8,
              }}
            >
              <option value="">Size</option>
              <option value='8 x 8"'>8 x 8</option>
              <option value='10"'>10</option>
              <option value='12"'>12</option>
              <option value='12 x 12"'>12 x 12</option>
              <option value='13 x 13"'>13 x 13</option>
              <option value='16 x 16"'>16 x 16</option>
              <option value='18 x 18"'>18 x 18</option>
            </select>

            <select
              value={bay}
              onChange={(e) => setBay(e.target.value)}
              style={{
                padding: 10,
                background: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: 8,
              }}
            >
              <option value="">Bay</option>
              <option value="A">Bay A</option>
              <option value="B">Bay B</option>
              <option value="C">Bay C</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              style={{
                padding: 10,
                background: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: 8,
              }}
            >
              <option value="name-asc">Sort: Name A-Z</option>
              <option value="name-desc">Sort: Name Z-A</option>
              <option value="bay-asc">Sort: Bay</option>
              <option value="material-asc">Sort: Material</option>
            </select>

            <button
              onClick={searchTiles}
              style={{
                padding: "10px 16px",
                background: "#a38f76",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Search
            </button>

            <button
              onClick={resetFilters}
              style={{
                padding: "10px 16px",
                background: "#5f5f5f",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {!hasSearched && (
          <div style={{ color: "black", marginBottom: 16 }}>
            Enter a search or choose filters, then click Search.
          </div>
        )}

        {hasSearched && (
          <>
            <div style={{ marginBottom: 12, color: "black" }}>
              {filteredTiles.length} tile{filteredTiles.length !== 1 ? "s" : ""} found
            </div>

            {activeFilters.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 16,
                }}
              >
                {activeFilters.map((filter, index) => (
                  <span
                    key={index}
                    style={{
                      background: "#f7f3ee",
                      color: "black",
                      border: "1px solid #d8cfc2",
                      borderRadius: 999,
                      padding: "6px 12px",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {filter}
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        {hasSearched && filteredTiles.length === 0 && (
          <div
            style={{
              background: "white",
              padding: 16,
              borderRadius: 12,
              border: "1px solid #ddd",
              color: "black",
            }}
          >
            No matching tiles found. Try changing your search or filters.
          </div>
        )}

        {filteredTiles.map((t) => (
          <div
            key={t.id}
            style={{
              background: "white",
              marginBottom: 12,
              padding: 18,
              borderRadius: 12,
              border: "1px solid #ddd",
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div>
                <strong style={{ fontSize: 18 }}>{t.name}</strong>

                <div style={{ marginTop: 8, color: "black" }}>
                  SKU {t.sku} • {t.material} • {t.size} • {t.color} • {t.finish}
                </div>
              </div>

              <div
                style={{
                  background: "#f4ede3",
                  border: "1px solid #d6c8b4",
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "black",
                  whiteSpace: "nowrap",
                }}
              >
                Bay {t.bay} | {t.side === "F" ? "Front" : "Rear"} | Sec {t.section} |{" "}
                {t.level === "T" ? "Top" : "Bottom"} | Slot {t.slot}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}