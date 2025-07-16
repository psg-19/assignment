# 📝 Feedback Collection Platform

A full-stack feedback platform built using the **MERN stack**. Businesses (Admins) can create forms and view responses. Customers can submit feedback via public links — no login required.

---

## 🌐 Demo Overview

### 👤 Admin
- Register / Login
- Create customizable feedback forms
- View response data in both raw and summary (charts) view

### 🙋 User (Customer)
- Access form via a public link (no login)
- Submit responses easily

---

## 🛠️ Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Frontend     | React + Vite + Tailwind CSS |
| Backend      | Node.js + Express  |
| Database     | MongoDB (Mongoose) |
| Charts       | Recharts           |
| Auth         | JWT (Admin only)   |

---

## 🚀 Features

### ✅ Admin
- JWT Auth (register/login)
- Create/edit feedback forms with 3–5 questions
- Support for text & multiple-choice questions
- See all responses in:
  - Raw tabular view
  - Summary charts view (bar charts)

### 📝 Public Form
- Public URL: `/f/:id`
- No login required
- User can submit feedback
- Clean responsive UI

---

