# AIODashboard-server

🗄️ Express + MongoDB Backend (Orders API)

This is the backend API for [AIODashboard](https://aiodashboard.netlify.app/) — a React-based frontend application.  
Built with **Express.js** and **MongoDB (Mongoose)**, deployed on **Render.com** with GitHub integration.

---

## 🚀 Features

- Express.js backend
- MongoDB Atlas with Mongoose
- Secure `.env` config
- CORS enabled for frontend
- Deployed on Render.com

---

## 🌍 Deployment

Hosted on Render.com

Live APIs:
https://aiodashboard-server.onrender.com/api/orders
https://aiodashboard-server.onrender.com/api/products (todo)
https://aiodashboard-server.onrender.com/api/users (todo)

Database: MongoDB Atlas (aiodashboarddb)

Frontend:[AIODashboard](https://aiodashboard.netlify.app/) (Deployed with Netlify)

---

## 🛠️ Setup

1. Clone repo
   git clone https://github.com/<your-username>/AIODashboard-server.git
   cd AIODashboard-server

2. Install dependencies
   npm install

3. Configure environment
   Create your .env with your MongoDB URI + PORT
   Example:
   PORT=5000
   MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/aiodashboarddb

4. Start dev server
   npm run dev
