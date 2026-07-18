# 🎨 INKY

INKY is a collaborative online whiteboard application that allows users to create, save, and share interactive drawing canvases in real time. Users can register, log in securely, manage multiple canvases, and collaborate with others through live drawing synchronization using WebSockets.

---

## 🚀 Features

- 🔐 User Authentication (JWT)
- 🎨 Interactive drawing canvas
- ✏️ Pencil, line, rectangle, circle, and eraser tools
- 🎨 Color picker
- 📏 Stroke width selection
- 💾 Save drawings to MongoDB
- 📂 Create and manage multiple canvases
- 🤝 Share canvases with other registered users
- ⚡ Real-time collaboration using Socket.IO
- 👤 User profile with canvas management

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- HTML5 Canvas API
- Socket.IO Client

### Backend
- Node.js
- Express.js
- Socket.IO
- JWT Authentication
- bcrypt.js

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 📂 Project Structure

```
INKY/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── index.js
│   └── db.js
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── utilities/
│   └── config.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/inky.git
cd inky
```

### Install frontend dependencies

```bash
npm install
```

### Install backend dependencies

```bash
cd backend
npm install
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend (`.env`)

```env
REACT_APP_API_URL=http://localhost:3030
```

For production, set:

```env
REACT_APP_API_URL=https://your-render-backend.onrender.com
```

---

## ▶️ Running the Application

### Start the backend

```bash
cd backend
npm start
```

### Start the frontend

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

---


## 🔒 Authentication

INKY uses JSON Web Tokens (JWT) for authentication.

Authenticated routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

Passwords are securely hashed using bcrypt before being stored in MongoDB.

---

## 🌐 Deployment

Frontend:
- Vercel

Backend:
- Render

Database:
- MongoDB Atlas

---

## 📚 Future Improvements
- Cursor presence for collaborators

---
## Live At

https://inky-five-navy.vercel.app


## 👩‍💻 Author

**Kavya**

GitHub: https://github.com/Kavya-025
