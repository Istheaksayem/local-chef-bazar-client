🍲 LocalChefBazaar — Marketplace for Local Home-Cooked Meals

<p align="center">
  <img src="https://i.ibb.co.com/WWKTKsd7/Screenshot-2026-04-17-142925.png" alt="Project Banner" width="100%">
</p>

## 🚀 Live Website
🔗https://dynamic-halva-2b4012.netlify.app/

---

## 📌 Project Overview

LocalChefBazaar is a modern full-stack MERN platform that connects home cooks with customers who want fresh, homemade meals.

👨‍🍳 Home chefs can:
- Upload meals
- Manage orders
- Earn money from home

🧑‍💻 Customers can:
- Browse meals
- Place orders
- Track delivery
- Give reviews

---

## 🎯 Key Features

### 🔐 Authentication & Security
- Email & Password Login (Firebase Auth)
- JWT Authentication (Secure API)
- Protected Routes
- Environment Variable Protected Keys

---

### 👤 User Roles & Permissions

#### 🧑 User (Customer)
- Browse meals
- Add to favorites
- Place orders
- Make payments (Stripe)
- Give reviews

#### 👨‍🍳 Chef
- Create meals
- Manage own meals
- Accept / Cancel / Deliver orders

#### 🛡️ Admin
- Manage users
- Approves Chef/Admin requests
- View platform statistics
- Mark users as Fraud

---

### 🍽️ Meals System
- Dynamic meals from database
- Sorting by price (ASC/DESC)
- Pagination (10 items per page)
- Meal details page with:
  - Ingredients
  - Chef info
  - Delivery time

---

### ⭐ Reviews & Favorites
- Add review for meals
- Update / Delete review
- Add to favorite meals
- Prevent duplicate favorites

---

### 🛒 Order System
- Place order with quantity
- Auto price calculation
- Order status tracking:
  - Pending → Accepted → Delivered
- SweetAlert confirmation

---

### 💳 Payment Integration
- Stripe payment system
- Payment history saved
- Payment status update

---

### 📊 Dashboard System

#### 👤 User Dashboard
- My Profile
- My Orders
- My Reviews
- Favorite Meals

#### 👨‍🍳 Chef Dashboard
- Create Meal
- My Meals (Update/Delete)
- Order Requests

#### 🛡️ Admin Dashboard
- Manage Users
- Manage Requests
- Platform Statistics (Recharts)

---

### 📈 Platform Statistics
- Total Users
- Total Payments
- Orders Pending / Delivered
- Charts using Recharts

---


## 🛠️ Technologies Used

### Frontend:
- React.js
- React Router
- Tailwind CSS
- Firebase Authentication
- React Hook Form
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Payment:
- Stripe

### Charts:
- Recharts

## 📦 NPM Packages

- react-router
- firebase
- react-hook-form
- sweetalert2
- jsonwebtoken
- cors
- dotenv
- stripe
