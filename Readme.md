# 🛒 SwasthyaPro Backend

A Node.js + Express backend for managing user authentication and cart operations in a health test booking app.

## 🚀 Tech Stack

- Node.js + Express
- PostgreSQL (Sequelize ORM)
- JWT Auth (Access & Refresh tokens via Cookies)

## 📁 Features

- User Register/Login/Logout
- Authenticated routes
- Add/View/Delete Cart Items

## 🔐 Auth APIs

| Method | Route         | Description      |
|--------|---------------|------------------|
| POST   | /api/auth/register | Register user  |
| POST   | /api/auth/login    | Login user     |
| POST   | /api/auth/logout   | Logout (with cookies) |

## 🛒 Cart APIs

| Method | Route         | Description           |
|--------|---------------|-----------------------|
| POST   | /api/cart     | Add item to cart      |
| GET    | /api/cart     | View user cart        |
| DELETE | /api/cart/:id | Delete item from cart |

## ▶️ Setup

```bash
npm install
npm run dev
