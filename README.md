
# 🛒 MonkCart - Frontend Project


This project aims to build a highly scalable, modular, and optimized frontend platform for managing e-commerce products, variants, and user interactions. The application is focused on providing an excellent user experience, strong accessibility practices, and seamless backend integration.

---

## 📚 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables Setup](#environment-variables-setup)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React.js](https://reactjs.org/) (with Vite)
- **CSS**: CSS
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Version Control**: Git + GitHub

---

## ✨ Features

- Product Listing and Management
- Variant Handling (Add, Select, Manage)
- Drag & Drop Reordering
- Infinite Scrolling for Large Lists
- Modular and Scalable Folder Structure

---

## 🚀 Getting Started

Follow the steps below to set up the project locally on your machine.

1. Clone the Repository

    ```bash
    git clone https://github.com/AnujKV123/monkCart.git
    cd monkCart

2. Install dependencies

    ```bash
    npm install

3. Setup the Environment Variables

    ```bash
    touch .env

4. Add the following inside .env:

    ```bash
    VITE_API_KEY=YOUR_API_KEY

5. Run the development server

    ```bash
    npm run dev

6. The app will start at:

    ```bash
    http://localhost:5173

## 📂 Folder Structure

```bash
├── public/
├── src/
│   ├── assets/          # Images, icons
│   ├── components/      # Reusable components (ProductItem, VariantList, etc.)
│   ├── types/           # types and interfaces
│   ├── utils/           # utilities functions
│   ├── index.css/       # common css file
│   ├── styles/          # css files
│   ├── App.tsx          # main rendring component
│   └── main.tsx         # App entry component
├── .env                 # Environment variables
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
└── README.md




