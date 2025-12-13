# AWS MVP – Quotes & Products App

This repository contains a **small end-to-end MVP** built to practice a real deployment flow on **AWS EC2**, including:

- Backend API with **Node.js + Express**
- Frontend with **React + Vite**
- Relational database (**MySQL**)
- Git + GitHub workflow
- Future CI/CD pipelines

The goal of the project is not feature completeness, but to have a **clean, realistic, and deployable architecture** that can be iterated on.

---

## ✨ What this MVP does

- Manages **companies** (multi-tenant design)
- Stores **products** per company
- Stores **customers** per company
- Manages **quotes (budgets)** with header + line items
- Exposes a REST API to retrieve products and quotes
- Displays products and quote details in a **minimalist React UI**

Current scope is **read-only** (no create/edit from the UI yet).

---

## 🧱 Tech Stack

### Backend

- Node.js (ESM)
- Express
- MySQL
- dotenv
- helmet, cors, morgan

### Frontend

- React
- Vite
- Plain CSS / inline styles (no UI framework yet)

### Database

- MySQL 8+
- Relational schema with foreign keys
- Multi-company (multi-tenant) design

---

## 📁 Project Structure

```
aws-mvp-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.local (ignored)
│
├── frontend/
│   ├── src/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── config.js
│   │   └── App.jsx
│   └── package.json
│
├── db/
│   └── seed.sql
│
└── README.md
```

---

## 🗄️ Database Design

The database is designed to be **multi-tenant**.

Main tables:

- `companies`
- `users`
- `roles`
- `user_roles`
- `customers`
- `products`
- `quotes`
- `quote_items`

All business tables reference `company_id` to ensure proper data isolation.

A sample seed file is provided under:

```
db/seed.sql
```

---

## 🚀 Getting Started (Local Development)

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd aws-mvp-app
```

---

### 2️⃣ Backend setup

```bash
cd backend
npm install
```

Create a `.env.local` file:

```env
PORT=3001

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=presupuestos_db

JWT_SECRET=dev_secret
JWT_EXPIRES_IN=1d
```

Run the backend:

```bash
npm run dev
```

Health check:

```
GET http://localhost:3001/health
```

---

### 3️⃣ Database setup

- Create the database
- Run the schema and seed scripts from `db/seed.sql`

Make sure the backend can connect successfully before continuing.

---

### 4️⃣ Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🔌 Available API Endpoints

### Products

```
GET /api/products
Headers:
  x-company-id: 1
```

---

### Quotes

```
GET /api/quotes/:id
Headers:
  x-company-id: 1
```

Returns:

- Quote header
- Company info
- Customer info
- Quote items

---

## 🎯 Current Status

✔ Backend API running
✔ Database schema stable
✔ Seed data available
✔ Frontend layout implemented
✔ Products list working
✔ Quote detail endpoint working

---

## 🧭 Roadmap

- [ ] Quote list view
- [ ] PDF export for quotes
- [ ] Email sending (quotes)
- [ ] Authentication in frontend
- [ ] Dockerization
- [ ] CI/CD pipeline
- [ ] AWS EC2 deployment
- [ ] Optional TypeScript migration

---

## 📝 Notes

- This project is intentionally **simple and explicit**.
- No abstractions or frameworks were added prematurely.
- The focus is on **clarity, correctness, and deployability**.

---

## 👤 Author

**Gonzalo De Castro**

Software Engineer – Full Stack (React / Node.js / Databases)

---

## 📄 License

This project is for educational and personal practice purposes.
