const express = require("express");
const router = express.Router();
const menuStore = require("../data/menu");

// GET /api/menu - list all items
router.get("/", (req, res) => {
  res.json(menuStore.getAll());
});

// POST /api/menu - create item (admin)
router.post("/", (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "name and price are required" });
  }
  const item = menuStore.create(req.body);
  res.status(201).json(item);
});

// PUT /api/menu/:id - update item (admin)
router.put("/:id", (req, res) => {
  const item = menuStore.update(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

// DELETE /api/menu/:id - remove item (admin)
router.delete("/:id", (req, res) => {
  const ok = menuStore.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: "Item not found" });
  res.status(204).end();
});

module.exports = router;
