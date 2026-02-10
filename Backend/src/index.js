import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import {connectedDB} from './lib/db.js';

import { app, server } from './lib/socket.js';

dotenv.config();
const port = process.env.PORT;
// const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5174',
    credentials: true, // Allows the backend to receive cookies
}));

app.use('/api/auth', authRoutes);
app.use("/api/messages", messageRoutes );

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));
}
server.listen(port, () => {
    console.log(`Server is listing on the port ${port}`);
    connectedDB();
});