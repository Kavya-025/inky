require("dotenv").config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const connectToDatabase = require('./db');

const userRoutes = require('./routes/userRoutes');
const canvasRoutes = require('./routes/canvasroutes');

const Canvas = require('./models/canvasModel');

const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/canvas', canvasRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("joinCanvas", async ({ canvasId }) => {

        console.log("Someone is trying to join canvas:", canvasId);

        try {

            const authHeader = socket.handshake.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {

                socket.emit("unauthorized", {
                    message: "Access denied. No token provided.",
                });

                return;
            }

            const token = authHeader.split(" ")[1];

            const decoded = jwt.verify(token, JWT_SECRET);

            const email = decoded.email;

            // Join the room
            socket.join(canvasId);

            console.log(`${socket.id} joined canvas ${canvasId}`);

            // Load the canvas
            const canvasData = await Canvas.loadCanvas(email, canvasId);

            // Send the current canvas to this client
            socket.emit("loadCanvas", canvasData);

            console.log("Canvas sent successfully");

        } catch (error) {

            console.error(error);

            socket.emit("unauthorized", {
                message: error.message,
            });

        }

    });

    socket.on("drawingUpdate", async ({ canvasId, elements }) => {

        try {

            await Canvas.findByIdAndUpdate(
                canvasId,
                { elements },
                { returnDocument: "after" }
            );

            // Broadcast to everyone else in the room
            socket.to(canvasId).emit("receiveDrawingUpdate", elements);

        } catch (error) {

            console.error(error);

        }

    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

});

server.listen(3030, () => {
    console.log("Server is running on http://localhost:3030");
});