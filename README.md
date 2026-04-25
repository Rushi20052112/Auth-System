# 🔐 Auth System

> A production-ready authentication system built with the MERN stack — featuring email verification, OTP-based password reset, and a clean user dashboard.

🔗 **Live Demo:** [https://auth-system-six-dusky.vercel.app](https://auth-system-six-dusky.vercel.app)

---

## 🚀 Features

- 📝 **User Registration** — Secure sign-up with hashed password storage
- ✅ **Email Verification** — Users must verify their email before accessing the app
- 🔑 **Login / Logout** — JWT-based session management with protected routes
- 🔢 **OTP-Based Forgot Password** — Time-limited OTP sent to email for secure password reset
- 📬 **Transactional Emails** — Powered by Nodemailer + Brevo SMTP
- 🗂️ **User Dashboard** — Displays the logged-in user's name and email with a logout button
- 📱 **Responsive Design** — Clean UI across all screen sizes
- 🌐 **Deployed on Vercel** — Fast, reliable frontend deployment

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | UI Library |
| Axios | HTTP Client |
| React Router | Client-side Routing |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| bcryptjs | Password Hashing |
| JSON Web Token (JWT) | Auth Token Generation & Verification |

### Integrations
| Service | Purpose |
|---------|---------|
| Nodemailer | Email sending library |
| Brevo (Sendinblue) | SMTP provider for transactional emails |

---

## 📧 Email Flows

### ✅ Email Verification
When a user registers, a **verification link** is sent to their email. The account remains inactive until the link is clicked.

### 🔢 Forgot Password (OTP)
When a user requests a password reset, a **one-time OTP** is sent to their registered email. The OTP is time-limited and expires after a short window for security.

---

## 🗂️ Dashboard

Once logged in, users are taken to a simple protected dashboard that displays:
- 👤 Their **name**
- 📧 Their **registered email**
- 🚪 A **Logout** button to end the session

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/auth-system.git
   cd auth-system
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `/server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

   # Nodemailer + Brevo
   BREVO_SMTP_HOST=smtp-relay.brevo.com
   BREVO_SMTP_PORT=587
   BREVO_SMTP_USER=your_brevo_login_email
   BREVO_SMTP_PASS=your_brevo_smtp_key
   EMAIL_FROM=your_sender_email@example.com

   CLIENT_URL=http://localhost:5173
   ```

   Create a `.env` file in the `/client` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Run the application**
   ```bash
   # Start the backend server
   cd server
   npm run dev

   # In a separate terminal, start the frontend
   cd client
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
auth-system/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Login, Register, Dashboard, ResetPassword
│   │   └── utils/           # Axios instance, helpers
│   └── ...
│
├── server/                  # Express backend
│   ├── controllers/         # Auth logic (register, login, verify, reset)
│   ├── models/              # User schema (Mongoose)
│   ├── routes/              # Auth routes
│   ├── middleware/          # JWT auth middleware
│   ├── utils/               # Email templates, OTP generator
│   └── ...
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/verify-email/:token` | Verify email address |
| POST | `/api/auth/forgot-password` | Send OTP to registered email |
| POST | `/api/auth/reset-password` | Verify OTP and reset password |
| GET | `/api/auth/me` | Get logged-in user details (protected) |

---

## 🌍 Deployment

| Layer | Platform |
|-------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | MongoDB Atlas |

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

Made with ❤️ by **Rushikesh Repale**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rushi20052112)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rushikesh-repale-46105925b/)

---

> ⭐ If you found this project helpful, please consider giving it a star on GitHub!
