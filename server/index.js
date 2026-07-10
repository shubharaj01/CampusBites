const express = require("express");
const cors = require("cors");

const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "campusbites-server" });
});

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`CampusBites server running on port ${PORT}`);
});
