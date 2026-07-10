# CampusBites — Canteen Ordering System

A full-stack MERN-style web app for ordering food on campus. Students browse
the menu, add items to a cart, check out, and track their order. Canteen
staff manage the menu and update order status from a simple admin dashboard.

Rebuilt from the original project report, with the described feature set
(menu, cart, checkout, order history, admin) fully implemented.

## Stack

- **Frontend:** React 18 + Vite, Tailwind CSS, React Router, Axios, lucide-react icons
- **Backend:** Node.js + Express (in-memory data store — see note below)

## Project structure

```
campusbites/
├── server/              Express API
│   ├── data/             menu.js, orders.js — in-memory stores
│   ├── routes/           menu.js, orders.js — REST endpoints
│   └── index.js
└── client/              React app (Vite)
    └── src/
        ├── components/   Header, MenuCard
        ├── context/       CartContext (cart state + localStorage)
        ├── pages/         Home, CartPage, Checkout, OrderHistory, Admin
        └── App.jsx
```

## Getting started

**Requirements:** Node.js 18+ and npm.

From the project root:

```bash
npm run install-all   # installs server and client dependencies
npm run dev           # runs backend (port 5000) and frontend (port 5173) together
```

Then open **http://localhost:5173** in your browser.

If you'd rather run them separately:

```bash
cd server && npm install && npm start     # http://localhost:5000
cd client && npm install && npm run dev   # http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to the backend, so no extra
configuration is needed in development.

## Features

- **Menu** — browse dishes with search and category filters
- **Cart** — add/remove items, adjust quantity, persists in the browser via localStorage
- **Checkout** — place an order with a pickup name, get an instant confirmation
- **Order history** — see all placed orders and their live status
- **Admin dashboard** — passcode-gated (`canteen123` by default, change it in
  `client/src/pages/Admin.jsx`) menu CRUD and order status updates

## About the data layer

To keep this easy to run with zero setup, menu items and orders are stored
**in memory** on the server (`server/data/menu.js` and `server/data/orders.js`)
— matching the sample code in the original report. Data resets when the
server restarts.

To connect a real MongoDB database instead:
1. `npm install mongoose --prefix server`
2. Replace the array-based functions in `server/data/menu.js` and
   `server/data/orders.js` with Mongoose models and queries
3. Add a `.env` file with `MONGODB_URI=...` and load it with `dotenv` in
   `server/index.js`

The routes in `server/routes/` don't need to change — they only call the
functions your data layer exports.

## Future enhancements (from the original report)

- User authentication and login
- Online payment integration (Razorpay/PayPal)
- Real-time order tracking via WebSockets
- PWA support for offline access
- Ratings and feedback on dishes
- Cloud deployment (AWS/Render)
