import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("sendMessage", (message) => {
    console.log("📩 New message:", message);
    io.emit("receiveMessage", message); // Відправляємо всім клієнтам
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("⚡ WebSocket Server is running on port 3001");
});
