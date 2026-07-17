import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [error, setError] = useState("");

  if (items.length === 0 && !confirmedOrder) {
    navigate("/");
    return null;
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await axios.post("/api/orders", {
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        total,
        customerName: name.trim() || "Guest"
      });
      setConfirmedOrder(res.data);
      clearCart();
    } catch {
      setError("Could not place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmedOrder) {
    return (
      <main className="max-w-lg mx-auto px-6 pt-16 pb-20 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center mx-auto mb-5">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink mb-2">
          Order confirmed!
        </h1>
        <p className="text-ink/60 mb-6">
          Order #{confirmedOrder.id} has been placed for {confirmedOrder.customerName}.
          Head to the counter once it's ready.
        </p>
        <div className="bg-white border border-line rounded-xl2 p-5 text-left mb-6">
          {confirmedOrder.items.map((i) => (
            <div key={i.id} className="flex justify-between text-sm py-1">
              <span className="text-ink/70">
                {i.qty} × {i.name}
              </span>
              <span className="font-medium text-ink">₹{i.price * i.qty}</span>
            </div>
          ))}
          <div className="border-t border-line mt-3 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{confirmedOrder.total}</span>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Link
            to="/orders"
            className="bg-ink text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-brand-600 transition-colors focus-ring"
          >
            View order history
          </Link>
          <Link
            to="/"
            className="border border-line rounded-full px-5 py-2.5 text-sm font-semibold text-ink/70 hover:border-brand-400 transition-colors focus-ring"
          >
            Back to menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-6 pt-10 pb-20">
      <h1 className="font-display text-3xl font-semibold text-ink mb-6">Checkout</h1>

      <div className="bg-white border border-line rounded-xl2 p-5 mb-6">
        {items.map((i) => (
          <div key={i.id} className="flex justify-between text-sm py-1">
            <span className="text-ink/70">
              {i.qty} × {i.name}
            </span>
            <span className="font-medium text-ink">₹{i.price * i.qty}</span>
          </div>
        ))}
        <div className="border-t border-line mt-3 pt-3 flex justify-between font-semibold text-ink">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="bg-white border border-line rounded-xl2 p-5">
        <label className="block text-sm font-medium text-ink/70 mb-1.5" htmlFor="name">
          Name for pickup
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Aditi"
          className="w-full px-4 py-2.5 rounded-lg border border-line text-sm mb-4 focus-ring"
        />
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-ink text-white rounded-full py-3 text-sm font-semibold hover:bg-brand-600 transition-colors focus-ring disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Placing order...
            </>
          ) : (
            `Place order · ₹${total}`
          )}
        </button>
      </form>
    </main>
  );
}
       
