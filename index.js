//1. packages
import express from 'express';
import http from 'http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

//2. Instances

const app = express();
 const server = http.createServer(app);
 const io = new Server(server);

//3. Serving HTML File
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/", (req, res) => res.sendFile(join(__dirname, "index.html")));

//4. Define a connection event handler
io.on("connection", (client) => {
    console.log('user connected to the (Server)')
    client.on('disconnect', () => {
        console.log('user disconnected from the (Server)')
    })


})

//5. Start the server

const PORT = 3000

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));