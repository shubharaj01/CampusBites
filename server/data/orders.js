// In-memory order store. Swap for MongoDB later if needed.

let nextId = 1;
let orders = [];

function getAll() {
  return orders;
}

function create(data) {
  const order = {
    id: nextId++,
    items: data.items,
    total: data.total,
    customerName: data.customerName || "Guest",
    status: "Placed",
    createdAt: new Date().toISOString()
  };
  orders.unshift(order);
  return order;
}

function updateStatus(id, status) {
  const order = orders.find((o) => o.id === Number(id));
  if (!order) return null;
  order.status = status;
  return order;
}

module.exports = { getAll, create, updateStatus };                                                                                                                              
