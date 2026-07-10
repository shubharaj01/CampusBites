import React, { useEffect, useState } from "react";
import axios from "axios";
import { Lock, Pencil, Trash2, Plus, X } from "lucide-react";

const ADMIN_CODE = "canteen123"; // change this before deploying anywhere real

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "Main Course",
  image: "",
  available: true
};

export default function Admin() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  if (!unlocked) {
    return (
      <main className="max-w-sm mx-auto px-6 pt-20 pb-20 text-center">
        <div className="w-14 h-14 rounded-full bg-brand-50 text-brand-600 grid place-items-center mx-auto mb-4">
          <Lock size={22} />
        </div>
        <h1 className="font-display text-2xl font-semibold text-ink mb-2">Staff access</h1>
        <p className="text-ink/60 text-sm mb-6">Enter the canteen passcode to manage the menu.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (code === ADMIN_CODE) {
              setUnlocked(true);
            } else {
              setCodeError("Incorrect passcode.");
            }
          }}
        >
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Passcode"
            className="w-full px-4 py-2.5 rounded-lg border border-line text-sm mb-3 text-center focus-ring"
          />
          {codeError && <p className="text-sm text-red-500 mb-3">{codeError}</p>}
          <button className="w-full bg-ink text-white rounded-full py-2.5 text-sm font-semibold hover:bg-brand-600 transition-colors focus-ring">
            Unlock
          </button>
          <p className="text-xs text-ink/30 mt-3">Default passcode: canteen123</p>
        </form>
      </main>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function loadMenu() {
    axios.get("/api/menu").then((res) => setMenu(res.data));
  }
  function loadOrders() {
    axios.get("/api/orders").then((res) => setOrders(res.data));
  }

  useEffect(() => {
    loadMenu();
    loadOrders();
  }, []);

  function startEdit(item) {
    setForm({ ...item, price: String(item.price) });
    setEditingId(item.id);
    setShowForm(true);
  }

  function startNew() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    if (editingId) {
      await axios.put(`/api/menu/${editingId}`, payload);
    } else {
      await axios.post("/api/menu", payload);
    }
    setShowForm(false);
    loadMenu();
  }

  async function handleDelete(id) {
    if (!confirm("Remove this item from the menu?")) return;
    await axios.delete(`/api/menu/${id}`);
    loadMenu();
  }

  async function toggleAvailable(item) {
    await axios.put(`/api/menu/${item.id}`, { available: !item.available });
    loadMenu();
  }

  async function setOrderStatus(id, status) {
    await axios.put(`/api/orders/${id}/status`, { status });
    loadOrders();
  }

  return (
    <main className="max-w-5xl mx-auto px-6 pt-10 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-semibold text-ink">Admin dashboard</h1>
        <button
          onClick={startNew}
          className="flex items-center gap-1.5 bg-ink text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-brand-600 transition-colors focus-ring"
        >
          <Plus size={16} /> Add item
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-line rounded-xl2 p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="sm:col-span-2 flex items-center justify-between">
            <h2 className="font-semibold text-ink">
              {editingId ? "Edit item" : "New item"}
            </h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-ink/40 hover:text-ink focus-ring"
            >
              <X size={18} />
            </button>
          </div>
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-4 py-2.5 rounded-lg border border-line text-sm focus-ring"
          />
          <input
            required
            type="number"
            min="0"
            placeholder="Price (₹)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="px-4 py-2.5 rounded-lg border border-line text-sm focus-ring"
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="px-4 py-2.5 rounded-lg border border-line text-sm focus-ring"
          />
          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="px-4 py-2.5 rounded-lg border border-line text-sm focus-ring"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="sm:col-span-2 px-4 py-2.5 rounded-lg border border-line text-sm focus-ring"
            rows={2}
          />
          <label className="flex items-center gap-2 text-sm text-ink/70">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => setForm({ ...form, available: e.target.checked })}
            />
            Available
          </label>
          <button
            type="submit"
            className="sm:col-span-2 bg-ink text-white rounded-full py-2.5 text-sm font-semibold hover:bg-brand-600 transition-colors focus-ring"
          >
            {editingId ? "Save changes" : "Add to menu"}
          </button>
        </form>
      )}

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-ink mb-4">Menu items</h2>
        <div className="bg-white border border-line rounded-xl2 divide-y divide-line overflow-hidden">
          {menu.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ink truncate">{item.name}</p>
                <p className="text-xs text-ink/50">{item.category} · ₹{item.price}</p>
              </div>
              <button
                onClick={() => toggleAvailable(item)}
                className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors focus-ring ${
                  item.available ? "bg-emerald-50 text-emerald-700" : "bg-ink/5 text-ink/50"
                }`}
              >
                {item.available ? "Available" : "Sold out"}
              </button>
              <button
                onClick={() => startEdit(item)}
                className="text-ink/40 hover:text-brand-600 focus-ring"
                aria-label={`Edit ${item.name}`}
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-ink/40 hover:text-red-500 focus-ring"
                aria-label={`Delete ${item.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink mb-4">Incoming orders</h2>
        <div className="space-y-3">
          {orders.length === 0 && (
            <p className="text-ink/50 text-sm">No orders placed yet.</p>
          )}
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-line rounded-xl2 p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium text-ink">
                  Order #{order.id} · {order.customerName}
                </p>
                <p className="text-xs text-ink/50 truncate">
                  {order.items.map((i) => `${i.qty}× ${i.name}`).join(", ")} · ₹{order.total}
                </p>
              </div>
              <select
                value={order.status}
                onChange={(e) => setOrderStatus(order.id, e.target.value)}
                className="text-sm border border-line rounded-full px-3 py-1.5 focus-ring bg-paper"
              >
                {["Placed", "Preparing", "Ready", "Completed"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
