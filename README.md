# Aura
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Last Commit](https://img.shields.io/github/last-commit/vairamuththu-sinthujan/Aura)
![Open Issues](https://img.shields.io/github/issues/vairamuththu-sinthujan/Aura)
![Pull Requests](https://img.shields.io/github/issues-pr/vairamuththu-sinthujan/Aura)
![Stars](https://img.shields.io/github/stars/vairamuththu-sinthujan/Aura?style=social)
![Forks](https://img.shields.io/github/forks/vairamuththu-sinthujan/Aura?style=social)

**Aura** is a full-stack MERN (MongoDB, Express.js, React, Node.js) social media application that allows users to connect, share posts, and interact in real-time. Built with modern tools and best practices.


## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation Steps](#installation-steps)
5. [Environment Setup](#environment-setup)
6. [Run Instructions](#run-instructions)
7. [API Endpoints](#api-endpoints)
8. [Project Structure](#project-structure)
9. [Contributing](#contributing)
10. [Contact](#contact)
11. [Acknowledgments](#acknowledgments)
12. [License](#license)


## Features
- **User Authentication**: Secure registration and login using JWT, with password hashing via Bcrypt.

- **Profile Management**: Users can create and customize profiles, including avatar uploads and bio updates.

- **Post Creation and Management**: Ability to create, edit, and delete posts with text and images.

- **Social Interactions**: Like comment and save on posts, fostering engagement among users.

- **Follow System**: Users can follow or unfollow others, building a personalized network.

- **News Feed**: Dynamic feed displaying posts from users, updated in real-time.

- **Real-time Notifications**: Alerts for likes, and new followers.

- **Responsive Design**: Optimal user experience across devices.

- **Search Functionality**: Search bar to find users efficiently.

- **Pagination**: Efficient loading of posts and comments to enhance performance.

- **Rate Limiting**: Protects APIs from brute-force attacks by limiting repeated requests.


## Tech Stack

### Frontend

- **React 18** – Building dynamic and responsive user interfaces.
- **React Router 6** – Client-side routing.
- **Axios & Tanstack** – Handling HTTP requests.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **React Icons** – Icon library for React applications.
- **React Toastify** – Displaying toast notifications.

### Backend

- **Node.js** – JavaScript runtime environment.
- **Express.js** – Web framework for Node.js.
- **MongoDB** – NoSQL database for data storage.
- **Mongoose** – MongoDB object modeling tool.
- **JSON Web Tokens (JWT)** – Authentication and authorization.
- **Bcrypt.js** – Password hashing.
- **Cloudinary** – Image management.
- **Nodemailer & brevo** – Email sending functionality.

### Development Tools

- **Vite** – Frontend build tool for faster development.
- **ESLint** – Code linting.
- **Postman** – API testing and development.
- **Git & GitHub** – Version control and collaboration.


## Prerequisites

- **Node.js-**: v14+ (https://nodejs.org/)

- **npm-**: for package management

- **MongoDB-**: A running MongoDB instance (Atlas)

- **Cloudinary Account-**: (for image uploads)
- **brevo Account-**: (for sending emails)
- **Email Account-**: (e.g., Gmail, Outlook, Yahoo!, ProtonMail)

- **Git-**: to clone the repository


## Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/vairamuththu-sinthujan/Aura.git
   cd Aura
   
2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   
3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install

## Environment Setup

Create .env files in both the server and client directories with the following keys:
- **server (.env)**
  ```env
  MONGODB_URI=your_mongodb_connection_string
  
  JWT_SECRET=your_jwt_secret
  
  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  
  SMPT_USER_NAME=your_smtp_username
  SMPT_USER_PASSWORD=your_smtp_password
  SENTER_EMAIL=your_email@example.com 

  CLIENT_URL=your_client_url
  
  PORT=4000

- **client (.env)**
  ```env
  VITE_BACKENDURL="http://localhost:4000"

## Run Instructions
- **Start the backend server**
  ```bash
  cd Aura/server
  npm run dev
- **Start the frontend development server**
  ```bash
  cd Aura/client
  npm run dev

## API Endpoints

| Method   | Endpoint                                            | Description                                 |
|----------|-----------------------------------------------------|---------------------------------------------|
|          |                                                     |                                             |
| **Auth** |                                                     |                                             |
| POST     | `/api/auth/register`                                | Register a new user                         |
| POST     | `/api/auth/login`                                   | Log in an existing user                     |
| POST     | `/api/auth/logout`                                  | Log out the authenticated user              |
| POST     | `/api/auth/reset-otp`                               | Send OTP for password reset                 |
| POST     | `/api/auth/reset-password`                          | Reset user password using OTP               |
| GET      | `/api/auth/sent-verify-otp`                         | Send email verification OTP (protected)     |
| POST     | `/api/auth/verify-email`                            | Verify user email with OTP (protected)      |
|          |                                                     |                                             |
| **Notifications** |                                             |                                             |
| GET      | `/api/notification/:userName`                       | Get all notifications for a user            |
| DELETE   | `/api/notification/delete/:notificationId`          | Delete a specific notification              |
|          |                                                     |                                             |
| **Posts**|                                                     |                                             |
| POST     | `/api/post/create`                                  | Create a new post (protected)               |
| DELETE   | `/api/post/delete`                                  | Delete a post (protected)                   |
| GET      | `/api/post/all`                                     | Get all posts (protected)                   |
| PUT      | `/api/post/like_and_unlike/:postId`                 | Like or unlike a post (protected)           |
| PUT      | `/api/post/save_and_unsave/:postId`                 | Save or unsave a post (protected)           |
| PUT      | `/api/post/edit/:postId`                            | Edit an existing post (protected)           |
| POST     | `/api/post/comment/:postId`                         | Add a comment to a post (protected)         |
| GET      | `/api/post/saved/:user`                             | Get all saved posts for a user (protected)  |
| GET      | `/api/post/:user`                                   | Get all posts by a specific user (protected)|
|          |                                                     |                                             |
| **Users**|                                                     |                                             |
| GET      | `/api/users/me`                                     | Get current authenticated user’s profile    |
| GET      | `/api/users/suggest_users`                          | Get suggested users to follow (protected)   |
| PUT      | `/api/users/me/edit`                                | Edit current user’s details (protected)     |
| GET      | `/api/users/find_users/:userName`                   | Search for users by username (protected)    |
| POST     | `/api/users/follow/:id`                             | Follow or unfollow another user (protected) |
| GET      | `/api/users/:username`                              | Get a user’s public profile (protected)     |

## Project Structure

### Client Architecture
The frontend is built with React and Vite, following a component-based architecture:

- **assets/**: Contains static resources like images and icons
- **components/**: Reusable UI components shared across multiple pages
- **context/**: React context providers for global state management
- **hooks/**: Custom React hooks for shared logic.
- **pages/**: Page components that represent different routes in the application

### Server Architecture
The backend follows a modular MVC-like architecture:

- **config/**: Environment variables, database, Cloudinary and Mail services connection, and other configuration
- **controllers/**: Business logic for handling API requests
- **middleware/**: Custom middleware for authentication
- **models/**: Mongoose schema definitions for MongoDB collections
- **routes/**: Express route definitions that map to controllers
- **utils/**: Helper functions, utilities, and shared code

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork** the repository and create your branch:  
   ```bash
   git checkout -b feature/new-feature

2. **Commit** your changes with a descriptive message:  
   ```bash
   git commit -m "Add amazing new feature"

3. **Push** to the branch:  
   ```bash
   git push origin feature/new-feature

## Contact
- **GitHub**: @vairamuththu-sinthujan
- **Email**: aura.social@proton.com

## Acknowledgments

- [React](https://reactjs.org/) – A JavaScript library for building user interfaces.
- [Express.js](https://expressjs.com/) – Fast, unopinionated, minimalist web framework for Node.js.
- [MongoDB](https://www.mongodb.com/) – The world’s leading modern, document-oriented database.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development.
- [brevo](https://app.brevo.com/) – An email provider that can be used with Node.js.
- [ChatGPT](https://chat.openai.com/) – OpenAI’s advanced conversational AI.
- [DeepSeek](https://www.deepseek.com/) – AI research company focused on high-performance language models.
- [Mistral](https://www.mistral.ai/) – Independent AI lab building state-of-the-art language models.
- [Claude](https://claude.ai/) – Anthropic’s next-generation AI assistant.


## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
```markdown
Copyright (c) 2025-present sinthujan <aura.social@proton.com>
