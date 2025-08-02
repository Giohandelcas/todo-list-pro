# 📝 To-Do List Pro – Task Management API

To-Do List Pro is a complete backend API built with **Node.js**, **Express**, and **MySQL**, designed for managing personal tasks with secure user authentication and full CRUD functionality.

---

## 🚀 Features

- ✅ User registration and login
- 🔐 JWT-based authentication
- 🔒 Password hashing with bcrypt
- 📋 Create, read, update, and delete tasks
- 🗃️ MySQL integration using connection pooling
- 🧩 Modular code structure for scalability

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MySQL
- `mysql2` package
- `bcryptjs`
- `jsonwebtoken` (JWT)
- `dotenv` for environment variables
- CORS

---

## 📁 Backend project Structure

/backend-todo-pro
├── controllers/
│ └── taskController.js
├── routes/
│ └── taskRoutes.js
├── models/
│ └── taskModel.js
├── middleware/
│ └── authMiddleware.js
├── db.js
├── index.js
├── .env
├── .gitignore
└── package.json
