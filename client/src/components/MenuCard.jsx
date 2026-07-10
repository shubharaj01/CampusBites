import React, { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function MenuCard({ item }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <div className="group bg-white rounded-xl2 overflow-hidden border border-line shadow-card hover:shadow-cardHover transition-shadow duration-300">
      <div className="relative h-40 overflow-hidden bg-brand-50">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wide bg-white/90 text-ink/70 px-2 py-1 rounded-full">
          {item.category}
        </span>
        {!item.available && (
          <span className="absolute inset-0 bg-ink/60 grid place-items-center text-white text-sm font-medium">
            Sold out
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-ink leading-tight">
            {item.name}
          </h3>
          <span className="font-semibold text-ink whitespace-nowrap">₹{item.price}</span>
        </div>
        <p className="text-sm text-ink/60 mt-1 line-clamp-2">{item.description}</p>

        <button
          onClick={handleAdd}
          disabled={!item.available}
          className={`mt-4 w-full flex items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed ${
            justAdded
              ? "bg-emerald-600 text-white"
              : "bg-ink text-white hover:bg-brand-600"
          }`}
        >
          {justAdded ? (
            <>
              <Check size={16} /> Added
            </>
          ) : (
            <>
              <Plus size={16} /> Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
