const express = require("express");
const router = express.Router();
const orderStore = require("../data/orders");

// GET /api/orders - order history
router.get("/", (req, res) => {
  res.json(orderStore.getAll());
});

// POST /api/orders - place a new order
router.post("/", (req, res) => {
  const { items, total } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Order must include at least one item" });
  }
  const order = orderStore.create(req.body);
  res.status(201).json(order);
});

// PUT /api/orders/:id/status - update order status (admin)
router.put("/:id/status", (req, res) => {
  const { status } = req.body;
  const order = orderStore.updateStatus(req.params.id, status);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

module.exports = router;
