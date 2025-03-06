# Employee Leave Management System

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

A modern Employee Leave Management System built with **Node.js**, **Express**, and **MongoDB** to streamline leave applications, approvals, and reporting in organizations. Designed for employees, managers, HR personnel, and administrators.

---

## 📝 Description

This system automates the process of managing employee leaves, providing role-based access to:
- **Employees**: Apply for leaves and track their status.
- **Managers**: Approve/reject leave requests.
- **HR**: Generate leave reports and monitor trends.
- **Admins**: Manage employee records and leave policies.

Built with security and scalability in mind, it uses **JWT authentication**, **role-based access control (RBAC)**, and **MongoDB** for data storage.

---

## ✨ Key Features

| Module          | Features |
|----------------|----------|
| **Employee**   | - Register/Login with JWT authentication.<br>- Apply for leaves (Annual, Sick, Casual).<br>- View leave history and balances. |
| **Manager**    | - Approve/Reject leave requests.<br>- Add comments to leave applications. |
| **HR**        | - Generate detailed leave reports.<br>- Analyze leave trends across teams. |
| **Admin**      | - Create/Update/Delete employee records.<br>- Set leave quotas and policies. |
| **Security**   | - JWT-based authentication.<br>- Role-based access control.<br>- Password hashing with bcrypt. |
| **Validation** | - Request validation using Joi.<br>- Error handling middleware. |

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose (ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Bcrypt for password hashing
- **Validation**: Joi
- **Testing**: Postman
- **Dev Tools**: Nodemon

---

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/employee-leave-management-system.git
   cd employee-leave-management-system

2. **Install dependencies**:
    ```bash
    npm install

3. **Set up environment variables**:
    Create a .env file:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/leave_management
    JWT_SECRET=your_jwt_secret_key

4. **Start the server**:
    ```bash
    nodemon app.js
    
---
## 📚 API Documentation

### Authentication
| Method | Endpoint         | Description            |
|--------|-----------------|------------------------|
| POST   | `/auth/register` | Register a new user   |
| POST   | `/auth/login`    | Login and get JWT     |

### Employee Endpoints
| Method | Endpoint                     | Description         |
|--------|-----------------------------|---------------------|
| GET    | `/employees/leaves`         | View leave history |
| POST   | `/employees/leaves/apply`   | Apply for leave    |

### Manager Endpoints
| Method | Endpoint                      | Description            |
|--------|------------------------------|------------------------|
| PUT    | `/manager/leaves/:leaveId`   | Approve/Reject leave  |

### HR Endpoints
| Method | Endpoint                 | Description              |
|--------|-------------------------|--------------------------|
| GET    | `/hr/leaves/report`     | Generate leave report   |

### Admin Endpoints
| Method | Endpoint                      | Description               |
|--------|------------------------------|---------------------------|
| POST   | `/admin/employees`           | Create a new employee    |
| PUT    | `/admin/employees/:id`       | Update employee details  |
| DELETE | `/admin/employees/:id`       | Delete an employee       |

---

## 📄 Sample Requests
1. **Apply for Leave**
   ```http
   POST /employees/leaves/apply
   Authorization: Bearer <JWT_TOKEN>
   Content-Type: application/json
   {
   "leaveType": "Annual",
   "startDate": "2023-10-10",
   "endDate": "2023-10-15",
   "reason": "Family vacation"
   }

2. **Approve Leave**
   ```http
   PUT /manager/leaves/650f1b2e4f1a2b3c4d5e6f7g
   Authorization: Bearer <JWT_TOKEN>
   Content-Type: application/json
   {
   "status": "Approved",
   "managerComments": "Approved for vacation"
   }

---

## 🙌 Thank You!  
Thank you for checking out this project! If you have any feedback or suggestions, feel free to contribute or reach out. Happy coding! 🚀  




