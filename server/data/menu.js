// In-memory menu store.
// Swap this file for a MongoDB model (e.g. Mongoose) later without
// touching the routes — they only call the functions exported below.

let nextId = 11;

let menu = [
  {
    id: 1,
    name: "Biryani",
    description: "Fragrant rice layered with spiced meat and herbs",
    price: 120,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=60",
    available: true
  },
  {
    id: 2,
    name: "Pizza",
    description: "Cheesy pizza with tomato sauce and toppings",
    price: 220,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=60",
    available: true
  },
  {
    id: 3,
    name: "Burger",
    description: "Juicy patty with fresh lettuce and sauces",
    price: 95,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=60",
    available: true
  },
  {
    id: 4,
    name: "Sandwich",
    description: "Toasted sandwich with veggies and cheese",
    price: 60,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=800&q=60",
    available: true
  },
  {
    id: 5,
    name: "Samosa",
    description: "Crispy pastry filled with spiced potatoes",
    price: 20,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=60",
    available: true
  },
  {
    id: 6,
    name: "Coffee",
    description: "Hot brewed coffee to kickstart your day",
    price: 35,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=60",
    available: true
  },
  {
    id: 7,
    name: "Cold Drink",
    description: "Chilled soft drink",
    price: 25,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=60",
    available: true
  },
  {
    id: 8,
    name: "Fried Rice",
    description: "Wok-fried rice with veggies and soy",
    price: 80,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=60",
    available: true
  },
  {
    id: 9,
    name: "Noodles",
    description: "Stir-fried noodles with veggies and sauce",
    price: 75,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=60",
    available: true
  },
  {
    id: 10,
    name: "French Fries",
    description: "Crispy golden fries with a pinch of salt",
    price: 45,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=60",
    available: true
  }
];

function getAll() {
  return menu;
}

function getById(id) {
  return menu.find((item) => item.id === Number(id));
}

function create(data) {
  const item = {
    id: nextId++,
    name: data.name,
    description: data.description || "",
    price: Number(data.price) || 0,
    category: data.category || "Other",
    image: data.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=60",
    available: data.available !== undefined ? Boolean(data.available) : true
  };
  menu.push(item);
  return item;
}

function update(id, data) {
  const item = getById(id);
  if (!item) return null;
  Object.assign(item, {
    name: data.name ?? item.name,
    description: data.description ?? item.description,
    price: data.price !== undefined ? Number(data.price) : item.price,
    category: data.category ?? item.category,
    image: data.image ?? item.image,
    available: data.available !== undefined ? Boolean(data.available) : item.available
  });
  return item;
}

function remove(id) {
  const index = menu.findIndex((item) => item.id === Number(id));
  if (index === -1) return false;
  menu.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
