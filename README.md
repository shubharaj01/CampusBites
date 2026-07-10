
<h1> 🍽️ CampusBites </h1>
    
>*Building a smarter and more efficient campus dining experience.*

`Academic Mini Project` | `5th Semester`


---

## ✨ Features

| 👨‍🎓 Student Experience | 👨‍🍳 Admin Dashboard   |
| ------------------------ | ----------------------- |
| 🍽️ Browse menu          | 🔐 Secure admin access  |
| 🔍 Search & filter items | ➕ Add menu items        |
| 🛒 Manage shopping cart  | ✏️ Edit menu items      |
| ➕ Update quantities      | 🗑️ Delete menu items   |
| ✅ Checkout orders        | 📦 View customer orders |
| 📜 Order history         | 🔄 Update order status  |


---

## 🛠️ Tech Stack

| Category         | Technologies                    |
| ---------------- | ------------------------------- |
| Frontend         | React 18, Vite, Tailwind CSS    |
| Backend          | Node.js, Express.js             |
| Routing          | React Router                    |
| HTTP Client      | Axios                           |
| State Management | React Context API               |
| Icons            | Lucide React                    |
| Data Storage     | In-Memory JavaScript Data Store |

---

## 📁 Project Structure

```text
campusbites/
├── client/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── App.jsx
│
├── server/
│   ├── data/
│   ├── routes/
│   └── index.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or later)
* npm

### Install Dependencies

```bash
npm run install-all
```

### Run the Application

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

To run the frontend and backend separately:

```bash
# Backend
cd server
npm install
npm start

# Frontend
cd client
npm install
npm run dev
```

---

## ⚙️ Implementation Details

The modular backend architecture makes it straightforward to replace the current data layer with a persistent database such as MongoDB.

The application currently uses an **in-memory JavaScript data store**, where menu items and orders are stored in memory for simplicity and ease of setup. Consequently, all data is reset whenever the server restarts.


---

## 🎥 Demo

> **Demo Video:** https://youtu.be/9dTsCFINOH8?si=tzx9e1uqKykAFE4w 

---

## 👩‍💻 My Contribution

As part of the development team, my contributions included:

* Developing responsive frontend interfaces using React and Tailwind CSS.
* Managing application state using React Context API.
* Developed reusable and maintainable UI components.
* Implementing menu browsing, cart management, and checkout functionality.
---

## 👥 Team Project

CampusBites was developed as a collaborative academic mini project.

This repository is maintained and published as part of my software engineering portfolio, showcasing the project's implementation and my individual contributions.


---
⭐ Thanks for stopping by! feedback and suggestions are always appreciated.
