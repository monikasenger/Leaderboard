# 🏆 Leaderboard App

A full-stack application built with **Node.js**, **React.js**, and **MongoDB** that allows users to **claim points**, updates **rankings in real-time**, and displays a dynamic **leaderboard**.  

🔗 **Live Demo:** [LeaderBoard](https://leaderboard-ycts.onrender.com)

---

## ✨ Features

- 👥 **User Selection**: Select from a list of 10+ users.
- ➕ **Add New User**: Add users with categories.
- 🎯 **Claim Points**: Award random points (1–10) to the selected user.
- 📈 **Real-Time Leaderboard**: Rankings based on total points update instantly.
- 🕓 **Claim History**: Every claim is recorded with timestamp.
- 🧠 **Filter by Category**: See top users per category.

---

## 📁 Project Structure

### Backend – Node.js + Express
```bash
server/
├── config/
│ └── db.js
├── controllers/
│ ├── leaderboardController.js
│ └── userController.js
├── models/
│ ├── ClaimHistory.js
│ └── User.js
├── routes/
│ ├── leaderboardRoutes.js
│ └── userRoutes.js
├── .env
└── server.js

``` 

### Frontend – React.js
```bash
client/
├── assets/
│ └── rank.png
├── components/
│ ├── ClaimHistory.js
│ ├── Leaderboard.js
│ └── UserSelect.js
├── context/
│ └── AppContext.js
├── App.js
└── index.js

```

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/leaderboard-app.git
cd leaderboard-app
```


### 2. Setup Backend
```bash
cd server
npm install
```

Create a .env file in the server/ directory:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
Start the backend:

```bash
npm start
``` 
### 3. Setup Frontend
```bash
cd ../client
npm install
npm start
```
---

### 📡 API Endpoints
## 👤 User
```bash
Method	Route	Description
POST	/api/users/register	Add new user
GET	/api/users	Get all users
GET	/api/users/filter?category=xyz	Filter users by category
GET	/api/users/categories	Get all categories
```

## 🏆 Leaderboard
```bash
Method	Route	Description
GET	/api/users/leaderboard	Get top users
GET	/api/users/leaderboard/:category	Get top users by category
POST	/api/users/claim/:id	Claim random points for a user
GET	/api/users/:id/claims	Claim history for a user
```

### 🚀 Tech Stack
```bash
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Hosting: Render
``` 
---
### 🤝 Contributing
Feel free to fork this repo and open a Pull Request. Contributions, suggestions, and improvements are welcome!

