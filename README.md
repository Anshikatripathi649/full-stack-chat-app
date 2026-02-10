# 💬 Full Stack Chat Application

A real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO for instant messaging capabilities.

![Chat Application](<img width="1914" height="1022" alt="Screenshot 2026-02-10 134434" src="https://github.com/user-attachments/assets/13b79eae-6460-43d2-bd6c-04b6f8f66572" />
)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

## ✨ Features

- 🔐 **User Authentication** - Secure signup and login with JWT
- 💬 **Real-time Messaging** - Instant message delivery using Socket.IO
- 👥 **User Profiles** - Customizable user profiles with avatars
- 🔔 **Online Status** - See who's online in real-time
- 🎨 **Modern UI** - Beautiful interface built with DaisyUI and Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🍪 **Persistent Sessions** - Stay logged in with secure cookies
- 🖼️ **Image Support** - Send and receive images in chat (up to 5MB)

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library
- **Zustand** - State management
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.IO** - WebSocket library
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variables

## 📁 Project Structure

```
full-stack-chat-app/
├── Backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── models/          # Database models
│   │   ├── lib/             # Utilities (db, socket)
│   │   ├── middleware/      # Auth middleware
│   │   └── index.js         # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand stores
│   │   ├── lib/             # Utilities
│   │   └── App.jsx          # Main app component
│   └── package.json
└── package.json             # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anshikatripathi649/full-stack-chat-app.git
   cd full-stack-chat-app
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd Backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the `Backend` directory:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   CLIENT_URL=http://localhost:5174
   ```

4. **Run the application**

   **Development Mode:**
   ```bash
   # Terminal 1 - Run backend
   cd Backend
   npm start

   # Terminal 2 - Run frontend
   cd frontend
   npm run dev
   ```

   **Production Build:**
   ```bash
   # From root directory
   npm run build
   npm start
   ```

5. **Access the application**
   - Frontend: `http://localhost:5174`
   - Backend: `http://localhost:5001`

## 🌐 Deployment

This application is configured for deployment on [Render](https://render.com).

### Render Configuration

1. **Build Command:**
   ```bash
   npm run build
   ```

2. **Start Command:**
   ```bash
   npm run start
   ```

3. **Environment Variables (on Render):**
   - `NODE_ENV` = `production`
   - `PORT` = (auto-assigned by Render)
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = your secret key
   - `CLIENT_URL` = your deployed frontend URL

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Whitelist Render's IP addresses (or use `0.0.0.0/0` for all IPs)
4. Create a database user
5. Get your connection string and add it to environment variables

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /check` - Check authentication status
- `PUT /update-profile` - Update user profile

### Message Routes (`/api/messages`)
- `GET /users` - Get all users for sidebar
- `GET /:id` - Get messages with a specific user
- `POST /send/:id` - Send a message to a user

## 🔌 Socket Events

- `connection` - User connects
- `disconnect` - User disconnects
- `getOnlineUsers` - Get list of online users
- `newMessage` - Receive new message in real-time

## 🎨 UI Components

- **Navbar** - Navigation with user profile
- **Sidebar** - List of users/contacts
- **ChatContainer** - Main chat interface
- **MessageInput** - Send messages and images
- **AuthImagePattern** - Decorative background pattern

## 🔒 Security Features

- JWT-based authentication
- HTTP-only cookies
- Password hashing with bcrypt
- CORS configuration
- Input validation
- File size limits (5MB)

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Check network access in MongoDB Atlas

2. **Socket.IO Connection Issues**
   - Ensure backend server is running
   - Check CORS settings
   - Verify `CLIENT_URL` in environment variables

3. **Build Errors**
   - Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check Node.js version compatibility

4. **Images Not Uploading**
   - Verify file size is under 5MB
   - Check browser console for errors

## 📝 Scripts

### Root Directory
- `npm run build` - Build frontend and install dependencies
- `npm start` - Start backend server in production

### Backend
- `npm start` - Start server
- `npm run dev` - Start with nodemon (development)

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👩‍💻 Author

**Anshika Tripathi**

- GitHub: [@Anshikatripathi649](https://github.com/Anshikatripathi649)

## 🙏 Acknowledgments

- Socket.IO for real-time functionality
- DaisyUI for beautiful UI components
- MongoDB Atlas for database hosting
- Render for deployment platform

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

⭐ If you found this project helpful, please give it a star!
