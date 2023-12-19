Project Overview
Welcome to the MERN (MongoDB, Express.js, React.js, Node.js) Yoga Scheduler project! This project is designed to provide users with a seamless experience in managing their yoga sessions. Users can sign up, log in, view their dashboard, upgrade their time slots for the next month, and log out. The project implements JWT (JSON Web Token) authentication with the help of cookies for a secure and user-friendly experience.

Features
1. Sign Up Page
The sign-up page allows users to create a new account by providing the following information:
Name
Email
Password
Contact Number
Age
Time Slot
2. Login Page
The login page requires users to enter their email and password for authentication.
Upon successful login, users are redirected to their dashboard.
3. Dashboard
The dashboard displays the user's yoga details, including:
Name
Age
Contact Number
Time Slot
Users can upgrade their time slot for the next month.
The dashboard also includes a log-out button for secure session management.
Technologies Used
MongoDB: Used as the database to store user information and yoga details.
Express.js: Handles server-side logic and API endpoints.
React.js: Provides a dynamic and interactive user interface.
Node.js: Powers the backend server.
JWT (JSON Web Token): Used for authentication and secure communication between the frontend and backend.
Cookies: Employed to store JWT tokens securely for persistent user sessions.
Getting Started
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/mern-yoga-scheduler.git
cd mern-yoga-scheduler
Install dependencies:

bash
Copy code
# Install server-side dependencies
cd server
npm install

# Install client-side dependencies
cd ../client
npm install
Configure Environment Variables:

Create a .env file in the server directory with the following content:

env
Copy code
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the application:

bash
Copy code
# Start the server
cd ../server
npm start

# Start the client
cd ../client
npm start
Access the application at http://localhost:3000.
