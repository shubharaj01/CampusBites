import React, { useEffect, useState } from "react";
import axios from "axios";
import { Clock, PackageCheck } from "lucide-react";

const statusStyles = {
  Placed: "bg-amber-50 text-amber-700",
  Preparing: "bg-brand-50 text-brand-700",
  Ready: "bg-emerald-50 text-emerald-700",
  Completed: "bg-ink/5 text-ink/60"
};

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-6 pt-10 pb-20">
      <h1 className="font-display text-3xl font-semibold text-ink mb-6">Order history</h1>

      {loading && <p className="text-ink/50 text-sm">Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl2 border border-line">
          <PackageCheck className="mx-auto mb-3 text-ink/30" size={32} />
          <p className="text-ink font-medium">No orders yet.</p>
          <p className="text-ink/50 text-sm mt-1">Orders you place will show up here.</p>
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-line rounded-xl2 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-ink">Order #{order.id}</p>
                <p className="text-xs text-ink/50 flex items-center gap-1 mt-0.5">
                  <Clock size={12} />
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  statusStyles[order.status] || "bg-ink/5 text-ink/60"
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="border-t border-line pt-3">
              {order.items.map((i) => (
                <div key={i.id} className="flex justify-between text-sm py-0.5">
                  <span className="text-ink/70">
                    {i.qty} × {i.name}
                  </span>
                  <span className="text-ink font-medium">₹{i.price * i.qty}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold text-ink mt-2 pt-2 border-t border-line">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
