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

### Desarrollo Local con Azure MySQL

Para ejecutar localmente conectándote a la base de datos de Azure:

#### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd aws-mvp-app
```

#### 2️⃣ Configurar variables de entorno

**Backend** (`backend/.env.local`):

```env
NODE_ENV=development
PORT=3001
DB_HOST=tu-servidor-azure.mysql.database.azure.com
DB_PORT=3306
DB_USER=gonzalo
DB_PASSWORD=NuevaPasswordSegura123!
DB_NAME=presuflow
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=presuflow_super_secret_change_this
JWT_EXPIRES_IN=1d
```

**Frontend** (`frontend/.env.local`):

```env
VITE_API_BASE_URL=http://localhost:3001
```

#### 3️⃣ Instalar dependencias

```bash
npm install
npm run install:all
```

#### 4️⃣ Iniciar servicios

```bash
# Desarrollo (con hot-reload)
npm run dev
```

- **Backend:** http://localhost:3001
- **Frontend:** http://localhost:5173

**📚 Guía completa: [LOCAL_DEV.md](./LOCAL_DEV.md)**

### Alternativa: Usar Docker localmente

```bash
docker-compose up --build
```

---

## 🚀 Deployment on Amazon EC2

### 🐳 Docker (Recomendado)

La forma más fácil y consistente de desplegar en EC2 es usando Docker:

```bash
# 1. Instalar Docker en EC2
sudo yum install docker -y
sudo systemctl start docker
sudo usermod -aG docker ec2-user

# 2. Configurar variables de entorno
# Backend: Crear backend/.env.production con credenciales de Azure MySQL
# Frontend: Crear .env en la raíz con VITE_API_BASE_URL=http://tu-ip-ec2:3001

# 3. Construir y levantar servicios
docker-compose -f docker-compose.prod.yml up -d --build

# 4. Ver logs
docker-compose -f docker-compose.prod.yml logs -f
```

**📚 Guías:**

- ⚡ [Inicio Rápido](./QUICK_START.md) - Para empezar rápido
- 🚀 [GitHub Actions CI/CD](./GITHUB_ACTIONS_SETUP.md) - Despliegue automático
- 🐳 [Guía Completa de Docker](./DOCKER.md) - Documentación completa

### 🔄 CI/CD con GitHub Actions

El proyecto incluye un workflow de GitHub Actions para despliegue automático:

- Se ejecuta automáticamente en cada push a `main`
- También se puede ejecutar manualmente desde GitHub Actions
- Despliega automáticamente en EC2 usando Docker Compose

**📚 Configuración completa:** [GITHUB_ACTIONS_SETUP.md](./GITHUB_ACTIONS_SETUP.md)

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
- [x] Dockerization
- [x] CI/CD pipeline (GitHub Actions)
- [x] AWS EC2 deployment
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
