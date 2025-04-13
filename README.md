# 🧠 Psychologists.Services — an app for finding psychologists

## 📌 Project Description

**Psychologists.Services** is an application developed for a company that provides psychological services. Users can find experienced psychologists, filter specialists based on various criteria, add them to favorites, and book consultations.

---

## 💻 Main Technologies

- **React**
- **Firebase (Authentication + Realtime Database)**
- **React Router**
- **React Hook Form**
- **Yup**
- **Vite**
- **CSS Modules**
- **LocalStorage**
- **Vercel** — for deployment

---

## 🎯 Technical Specification (TЗ)

[https://docs.google.com/document/d/1PrTxBn6HQbb0Oz17g5_zvyLGIOZg0TIP3HPaEEp6ZLs/edit?pli=1&tab=t.0]

---

## 🔐 Authentication

- Firebase Authentication
- Registration/Login forms with validation (all fields are required)
- Modal windows can be closed via (x, Esc, backdrop)

---

## 📂 Firebase Realtime Database

- Collection "psychologists" with fields:
  - `name`, `avatar_url`, `experience`, `reviews`, `price_per_hour`, `rating`, `license`, `specialization`, `initial_consultation`, `about`

---

## ✨ Features

- Sorting psychologists
- Favorites (only for authenticated users)
- Consultation booking form (React Hook Form + Yup)
- User state persists after page reload

---

## 🌐 Routes

- `/` — Home
- `/psychologists` — Psychologists
- `/favorites` — Favorites (Private)

---

## 📦 Deployment

- Deployed on Vercel
- [https://psychologists-services-app-seven.vercel.app/]

---

## 📁 Design File

- [https://www.figma.com/file/I5vjNb0NsJOpQRnRpMloSY/Psychologists.Services?type=design&node-id=0-1&mode=design&t=4zfT2zFANRbp1fCK-0]

---

## 🚀 Start Project Locally

```bash
git clone https://github.com/angelina150/psychologists-services-app.git
cd psychologists-services-app
npm install
npm run dev
```

---

## 📨 Contact

[Contact email](chigiryova31@gmail.com)
