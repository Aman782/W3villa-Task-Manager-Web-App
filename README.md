# Task Manager Web Application

## Overview
This is a **Task Manager Web Application** built as part of the W3villa Technologies assignment. The application allows users to **register, log in, and manage tasks** (create, read, update, delete). It follows a full-stack architecture with **React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for the database**.

## Features
- **User Authentication & Authorization** (JWT-based secure login system)
- **Task Management** (CRUD operations: Create, Read, Update, Delete tasks)
- **Responsive UI** (Built with React.js, HTML, CSS, and JavaScript)
- **RESTful API** (Node.js & Express.js for handling backend logic)
- **MongoDB Database** (Storing user data and tasks securely)
- **Proper Validation & Error Handling** (Ensuring robustness and security)

## Tech Stack
### **Frontend:**
- React.js
- HTML, CSS, JavaScript
- Axios (For API calls)

### **Backend:**
- Node.js
- Express.js
- JSON Web Token (JWT) for authentication
- Mongoose (MongoDB ODM)

### **Database:**
- MongoDB (Cloud-hosted via MongoDB Atlas)

## Installation & Setup
### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (or use MongoDB Atlas for cloud hosting)

### **Clone the Repository**
```sh
$ git clone https://github.com/Aman782/W3villa-Task-Manager-Web-App/
$ cd task-manager-app
```

### **Backend Setup**
```sh
$ cd backend
$ npm install   # Install dependencies
$ npm start     # Run the backend server
```
The backend will be running at `https://vercel.com/aman782s-projects/w3villa-task-manager-web-app-x945`.

### **Frontend Setup**
```sh
$ cd frontend
$ npm install   # Install dependencies
$ npm start     # Start the frontend development server
```
The frontend will be running at `https://vercel.com/aman782s-projects/w3villa-task-manager-web-app-frontend`.

## API Endpoints
### **User Authentication**
| Method | Endpoint                | Description          |
|--------|-------------------------|----------------------|
| POST   | `/users/register`        | Register a new user |
| POST   | `/users/login`           | Login a user        |

### **Task Management**
| Method | Endpoint                | Description                   |
|--------|-------------------------|-------------------------------|
| GET    | `/tasks`                 | Get all tasks for the user   |
| POST   | `/tasks/create`          | Create a new task            |
| PUT    | `/tasks/update/:taskId`  | Update an existing task      |
| DELETE | `/tasks/delete-task`     | Delete a task                |

## Live Demo
The application is deployed on **Render**: [Live Demo](https://vercel.com/aman782s-projects/w3villa-task-manager-web-app-frontend)

## Demo Video
Watch the **2-3 min demo video** showcasing the app functionality: [Demo Video](https://drive.google.com/file/d/1hipSI6X_eRsQRBnCbwK7O0aE46wPt3pr/view?usp=sharing)

## Code Structure
```
/task-manager-app
│── backend
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── models
│   │   ├── middleware
│   │   ├── index.ja
│   ├── package.json
│
│── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   ├── package.json
│
│── README.md
```

## Security & Best Practices
- **Password Hashing**: User passwords are securely hashed using bcrypt.
- **JWT Authentication**: Ensures protected routes and secure user sessions.
- **Validation & Error Handling**: Implemented robust error handling for API requests.

## Testing
Thoroughly tested all functionalities, ensuring they work as expected and handle edge cases appropriately.

## Future Improvements
- Implement **task prioritization & categories**
- Add **due dates & reminders**
- Implement **role-based access control (RBAC)** for admin users

---
### Author
Developed by [AMAN PANDEY]((https://github.com/Aman782/)) 🚀

