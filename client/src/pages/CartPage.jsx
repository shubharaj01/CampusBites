import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, updateQty, removeItem, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-6 pt-16 pb-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink mb-2">
          Your cart is empty
        </h1>
        <p className="text-ink/60 mb-6">
          Add a few dishes from the menu to get started.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 bg-ink text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-brand-600 transition-colors focus-ring"
        >
          Browse the menu
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 pt-10 pb-20">
      <h1 className="font-display text-3xl font-semibold text-ink mb-6">Your cart</h1>

      <div className="bg-white rounded-xl2 border border-line divide-y divide-line overflow-hidden">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-ink truncate">{item.name}</p>
              <p className="text-sm text-ink/50">₹{item.price} each</p>
            </div>
            <div className="flex items-center gap-2 bg-paper border border-line rounded-full px-1">
              <button
                onClick={() => updateQty(item.id, item.qty - 1)}
                className="w-7 h-7 grid place-items-center rounded-full hover:bg-white focus-ring"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-5 text-center text-sm font-semibold">{item.qty}</span>
              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="w-7 h-7 grid place-items-center rounded-full hover:bg-white focus-ring"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
            <p className="w-16 text-right font-semibold text-ink">
              ₹{item.price * item.qty}
            </p>
            <button
              onClick={() => removeItem(item.id)}
              className="text-ink/30 hover:text-red-500 transition-colors focus-ring"
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl2 border border-line p-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-ink/50">Total</p>
          <p className="font-display text-2xl font-semibold text-ink">₹{total}</p>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="flex items-center gap-1.5 bg-ink text-white rounded-full px-6 py-3 text-sm font-semibold hover:bg-brand-600 transition-colors focus-ring"
        >
          Checkout <ArrowRight size={16} />
        </button>
      </div>
    </main>
  );
}
