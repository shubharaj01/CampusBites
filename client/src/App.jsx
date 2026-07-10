import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}
