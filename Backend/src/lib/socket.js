import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173']
    },
});


// used to store online users
const userSocketMap = {}; // {userId: socketId}

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log(`A user connected ${socket.id}`);

    const userId = socket.handshake.query.userId;

    if(userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} is online.`);
    }
 
    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
    // console.log(`A user disconnected ${socket.id}`);
    // delete userSocketMap[userId];
    const disconnectedUserId = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket.id);
    if (disconnectedUserId) {
        delete userSocketMap[disconnectedUserId];
        console.log(`User ${disconnectedUserId} went offline.`);

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

});
});

export { io, app, server}; 