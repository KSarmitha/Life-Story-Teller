# Life-Story-Teller

A **MERN Stack** application built using **MongoDB, Express, React, and Node.js**. This project is designed to demonstrate the implementation of Life-Story-Teller.

---

## Features

- **User login and registration with secure JWT-based authentication**
- **Profile Management**
- **Story submission via text and media**
- **AI-generated narratives using Gemini AI**
- **Chatbot assistance**
- **Story editing, deletion, download and sharing options**

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
   PORT=3001
   MONGO_URI=your_mongodb_connection_string
   FRONTEND_URL="http://localhost:5173"
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   ```

4. Start the development servers:

   - **Backend**:
     ```bash
     cd .\server\
     npm run start
     ```

   - **Frontend**:
     ```bash
     cd .\client\
     npm start
     ```

5. Access the app at `http://localhost:5173` (frontend) and `http://localhost:3001` (backend).

---

## Acknowledgments

- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Express Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
