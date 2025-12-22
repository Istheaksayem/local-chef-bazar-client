# 🍽️ LocalChefBazaar — Marketplace for Local Home-Cooked Meals

LocalChefBazaar is a full-stack MERN application that connects local home chefs with customers who are looking for fresh, affordable, and homemade meals. Users can browse meals, place orders, track delivery, and leave reviews, while chefs can manage their menus and orders. Admins control the overall platform.

🔗 **Live Site:** https://storied-pony-5556cc.netlify.app
🔗 **Client Repo:** https://github.com/Istheaksayem/local-chef-bazar-client 
🔗 **Server Repo:** https://github.com/Istheaksayem/local-chef-bazar-server 

---

## 🎯 Purpose
The purpose of this project is to build a modern role-based food marketplace platform using the MERN stack, demonstrating authentication, authorization, CRUD operations, payments, dashboards, and real-world application features.

---

## 🚀 Key Features

### 👥 User Roles
- **Admin**: Manage users, requests, and platform statistics  
- **Chef**: Create meals, manage orders, update meal info  
- **User**: Browse meals, place orders, review, and favorite meals  

### 🔐 Authentication & Security
- Firebase Authentication (Email & Password)

- httpOnly cookies for token storage
- Environment variables for Firebase & MongoDB credentials

### 🏠 Public Pages
- Home with animated banner (Framer Motion)
- Daily meals (dynamic)
- Customer reviews
- Meals page with sorting & pagination
- Login & Register

### 📄 Private Pages
- Meal Details with reviews & favorites
- Order & payment (Stripe)
- Dashboard (role-based)
- Profile management

### 📊 Dashboards
- **User Dashboard**: Orders, reviews, favorites, profile  
- **Chef Dashboard**: Create meals, manage meals & orders  
- **Admin Dashboard**: Manage users, requests, statistics  

### 💳 Payment
- Stripe payment integration
- Payment history saved in MongoDB
- Order payment status update

### ⭐ Extra Functionalities
- Review system with update & delete
- Favorite meals system
- Fraud user control
- Search & pagination
- Dynamic route titles
- Responsive design
- Loading & error pages
- Dark/Light theme (optional)

---

## 🧰 Tech Stack

### Frontend
- React.js
- React Router 
- Tailwind CSS
- Framer Motion
- React Hook Form
- Axios
- Firebase Auth
- SweetAlert2 / React Toastify
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB
  
- Stripe
- CORS
- dotenv

---

## 📦 NPM Packages Used
 react-stripe-js": "^5.4.1",
    
    tailwindcss
    tanstack/react-query
    axios
    firebase 
    framer-motion
    react
    react-router
    react-helmet-async
    react-hook-form
    react-icons
    
    react-toastify
    recharts
    stripe
    sweetalert2
