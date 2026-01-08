import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import {connectedDB} from './lib/db.js';

import { app, server } from './lib/socket.js';

dotenv.config();
const port = process.env.PORT;
// const __dirname = path.resolve;

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true, // Allows the backend to receive cookies
}));

app.use('/api/auth', authRoutes);
app.use("/api/messages", messageRoutes );


server.listen(port, () => {
    console.log(`Server is listing on the port ${port}`);
    connectedDB();
});