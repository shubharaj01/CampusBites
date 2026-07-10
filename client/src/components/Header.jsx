import React from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBag, UtensilsCrossed } from "lucide-react";
import { useCart } from "../context/CartContext";

const navLink =
  "px-3 py-2 text-sm font-medium rounded-full transition-colors focus-ring";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 group focus-ring rounded-lg">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-brand-500 text-white shadow-card group-hover:bg-brand-600 transition-colors">
            <UtensilsCrossed size={18} strokeWidth={2.25} />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            CampusBites
          </span>
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navLink} ${isActive ? "bg-brand-50 text-brand-700" : "text-ink/70 hover:bg-brand-50 hover:text-brand-700"}`
            }
          >
            Menu
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `${navLink} ${isActive ? "bg-brand-50 text-brand-700" : "text-ink/70 hover:bg-brand-50 hover:text-brand-700"}`
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `${navLink} ${isActive ? "bg-brand-50 text-brand-700" : "text-ink/70 hover:bg-brand-50 hover:text-brand-700"}`
            }
          >
            Admin
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative ml-2 grid place-items-center w-10 h-10 rounded-full transition-colors focus-ring ${
                isActive ? "bg-brand-500 text-white" : "bg-ink text-white hover:bg-brand-600"
              }`
            }
            aria-label="View cart"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid place-items-center w-5 h-5 rounded-full bg-accent text-ink text-[11px] font-bold shadow-card">
                {count}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
