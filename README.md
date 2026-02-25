# 🧑‍💼 Job Portal Application

A Full-Stack Job Portal Web Application built using modern web technologies.

---

## 🏗 Tech Stack

- Frontend: React (Vite + Tailwind CSS)
- Backend: Node.js + Express.js
- Database: PostgreSQL
- Authentication: JWT
- Email Service: Nodemailer

---

## 📌 Features

- 🔐 JWT Based Authentication
- 👨‍💼 Candidate & Employer Roles
- 📝 Job Posting System
- 📥 Job Applications
- ❤️ Saved Jobs
- 🛠 Admin Panel
- 📧 Email OTP Verification
- 🔑 Password Reset System
- 📊 Role-based Access Control

---

## 📂 Project Structure

```
Root
│
├── Backend
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── middleware
│   │   ├── services
│   │   └── server.js
│
├── Frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── layouts
│   │   └── utils
```

---

## 📋 Requirements

Make sure you have installed:

- Node.js (v18+ recommended)
- PostgreSQL
- Git

---

# 🚀 Project Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sandesh-Buchkul-EKOVITS/Job_Portal-Ekovits-.git
cd Job_Portal-Ekovits-
```

---

# ⚙ Backend Setup

```bash
cd Backend
npm install
```

## 🔑 Create `.env` file inside Backend folder

```
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=jobportal

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

JWT_SECRET=your_secret_key
```

---

## ▶ Run Backend

Using nodemon:

```bash
npm run dev
```

Or:

```bash
node src/server.js
```

Backend runs at:

```
http://localhost:5000
```

---

# 💻 Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🗄 Database Setup

1. Install PostgreSQL  
2. Create database:

```sql
CREATE DATABASE jobportal;
```

3. Update credentials in `.env`
4. Ensure all required tables are created before running the app.
5.🗄 Database Schema Setup

A schema.sql file has been added to the project.

To create all required database tables:

Open PostgreSQL (pgAdmin)

Connect to jobportal database

Open Query Tool

Copy and execute contents of schema.sql

OR

Run via terminal:

psql -U postgres -d jobportal -f schema.sql


This will create:

users

candidate_profile

employer_profile

jobs

applications

saved_jobs
---

# 🔗 API Base URL

Frontend should connect to:

```
http://localhost:5000
```

Make sure backend is running before starting frontend.

---

# ⚠ Environment Variables

Never push `.env` file to GitHub.  
Share credentials securely.

---

# 👨‍💻 Developed By

Shubham
