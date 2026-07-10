import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import MenuCard from "../components/MenuCard";

export default function Home() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    axios
      .get("/api/menu")
      .then((res) => setMenu(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(menu.map((m) => m.category))],
    [menu]
  );

  const filtered = menu.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <main className="max-w-6xl mx-auto px-6 pt-10 pb-20">
      <section className="mb-10">
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-2">
          Open now · Pickup
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink tracking-tight max-w-xl">
          Skip the queue, order ahead.
        </h1>
        <p className="text-ink/60 mt-3 max-w-md">
          Browse today's canteen menu, add what you like, and pick it up when it's ready.
        </p>
      </section>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a dish..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-line bg-white text-sm focus-ring"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus-ring ${
                category === cat
                  ? "bg-ink text-white"
                  : "bg-white border border-line text-ink/70 hover:border-brand-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-72 rounded-xl2 bg-white border border-line animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-16 bg-white rounded-xl2 border border-line">
          <p className="text-ink font-medium">Unable to load menu.</p>
          <p className="text-ink/50 text-sm mt-1">
            Please make sure the server is running, then try again.
          </p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl2 border border-line">
          <p className="text-ink font-medium">No dishes match your search.</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
