// package initialization
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

// configuration

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// middleware

app.use(cors());

// socket.io

io.on("connection", (socket) => {
    console.log('New client connection');

    socket.on('message', (message) => {
        console.log('Message received on server: ', message)
        io.emit('message', message);
    });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
