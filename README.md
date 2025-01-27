# Life-Story-Teller

A **MERN Stack** application built using **MongoDB, Express, React, and Node.js**. This project is designed to demonstrate the implementation of Life-Story-Teller.

---

## Features

- **Authentication**: User login and registration with secure JWT-based authentication.
- **CRUD Operations**: Full Create, Read, Update, and Delete operations for core application data.
- **API Integration**: Backend API with Express for data handling.
- **Responsive UI**: React-based frontend with responsive design.
- **State Management**: Context API for global state management.
- **Database**: MongoDB for data storage.

---

## Tech Stack

- **Frontend**: React, Axios, MUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JSON Web Tokens (JWT)

---

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v14 or above)
- **MongoDB** (local or cloud database like MongoDB Atlas)
- **npm** or **yarn**

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KSarmitha/Life-Story-Teller.git
   cd Life-Story-Teller
   ```

2. Install dependencies for both backend and frontend:

   - **Backend**:
     ```bash
     cd server
     npm install
     ```

   - **Frontend**:
     ```bash
     cd ../client
     npm install
     ```

3. Create a `.env` file in the `server` folder with the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   FRONTEND_URL="http://localhost:3000"
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   ```

4. Start the development servers:

   - **Backend**:
     ```bash
     cd server
     npm run dev
     ```

   - **Frontend**:
     ```bash
     cd ../client
     npm start
     ```

5. Access the app at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

---

## Acknowledgments

- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Express Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
