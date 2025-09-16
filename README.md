# MERN Ground Booking App

A full-stack web application to "book cricket grounds" and "connect with players".  
Built with **MERN (MongoDB, Express, React, Node.js)** and styled with **Tailwind CSS**.

-----------------------------------------------------------------------------------

## Features
-  User Authentication (Register / Login with JWT) also used bcrypt for secure passwords.
-  Admin Authentication (Register / Login with JWT) also used bcrypt for secure passwords.
-  Admins can add and manage grounds.
-  Image upload for grounds (Multer).
-  Search & filter grounds by name and location.
-  Player matching (connect with teammates)(still working on this)
-  Booking system with available time slots

--------------------------------------------------------------------------------------

## 🛠️ Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT + bcrypt
- **File uploads**: Multer
- **Linting**: ESLint
-----------------------------------------------------------------------------------------------

## 📂 Project Structure

### Frontend (React + Vite)
client/
├── public/               
├── src/
│   ├── admin/             
│   │   ├── AddGround.jsx
│   │   ├── AdminGrounds.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminRegister.jsx
│   │   └── EditGround.jsx
│   │
│   ├── api/               
│   │   └── Axios.js
│   │
│   ├── components/         
│   │   ├── GroundCard.jsx
│   │   └── GroundCardUser.jsx
│   │
│   ├── pages/             
│   │   └── (add your user pages here later if created)
│   │
│   ├── assets/             
│   │   └── react.svg
│   │
│   ├── Protectedroute.jsx  
│   ├── App.jsx           
│   ├── main.jsx            
│   ├── App.css
│   ├── index.css
│
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js

---------------------------------------------------------------------

### Backend (Node.js + Express + MongoDB)
server/
├── controllers/      
│   ├── admin_controller.js
│   ├── ground_controller.js
│   ├── request_controller.js
│   └── user_controller.js
│
├── middlewares/      
│   ├── auth.js       
│   └── multer.js     
│
├── models/           
│   ├── admin.js
│   ├── booking.js
│   ├── ground.js
│   ├── request.js
│   └── userModel.js
│
├── routes/           
│   ├── adminroute.js
│   ├── groundroute.js
│   ├── requestroute.js
│   └── userRoute.js
│
├── uploads/           
│   ├── 1754294983505.jpeg
│   ├── 1754390857553.jpeg
│   └── ...
│
├── config.js          
├── test.js           
└── server.js






