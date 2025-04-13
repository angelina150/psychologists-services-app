# 🧠 **Psychologists.Services** — An App for Finding Psychologists

## 📌 **Project Description**

**Psychologists.Services** is an application developed for a company that provides psychological services. Users can find experienced psychologists, filter specialists based on various criteria, add them to their favorites, and book consultations.

---

## 💻 **Main Technologies**

- **React**
- **Firebase** (Authentication + Realtime Database)
- **React Router**
- **React Hook Form**
- **Yup**
- **Vite**
- **CSS Modules**
- **LocalStorage**
- **Vercel** — for deployment

---

## 🎯 **Technical Specification (TЗ)**

[Technical Specification Document](https://docs.google.com/document/d/1PrTxBn6HQbb0Oz17g5_zvyLGIOZg0TIP3HPaEEp6ZLs/edit?pli=1&tab=t.0)

---

## 🔐 **Authentication**

- Firebase Authentication
- Registration/Login forms with validation (all fields are required)
- Modal windows can be closed via (x, Esc, or backdrop)

---

## 📂 **Firebase Realtime Database**

- Collection "psychologists" with the following fields:
  - `name`, `avatar_url`, `experience`, `reviews`, `price_per_hour`, `rating`, `license`, `specialization`, `initial_consultation`, `about`

---

## ✨ **Features**

- Sorting psychologists
- Favorites (available only to authenticated users)
- Consultation booking form (using React Hook Form + Yup)
- User state persists after page reload

---

## 🌐 **Routes**

- `/` — Home
- `/psychologists` — Psychologists List
- `/favorites` — Favorites (Private)

---

## 📦 **Deployment**

- Deployed on Vercel
- [Visit the App](https://psychologists-services-app-seven.vercel.app/)

---

## 📁 **Design File**

- [View Design on Figma](https://www.figma.com/file/I5vjNb0NsJOpQRnRpMloSY/Psychologists.Services?type=design&node-id=0-1&mode=design&t=4zfT2zFANRbp1fCK-0)

---

## 🚀 **Start Project Locally**

```bash
git clone https://github.com/angelina150/psychologists-services-app.git
cd psychologists-services-app
npm install
npm run dev
```

---

## 📨 Contact

You can reach me at: [chigiryova31@gmail.com](mailto:chigiryova31@gmail.com)
