require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const connectToDatabase = require("./db");

const userRoutes = require("./routes/userRoutes");
const canvasRoutes = require("./routes/canvasroutes");

const Canvas = require("./models/CanvasModel");

const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/canvas", canvasRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("joinCanvas", async ({ canvasId }) => {

        try {

            const token = socket.handshake.auth.token;

            if (!token) {
                socket.emit("unauthorized", {
                    message: "Access denied. No token provided.",
                });
                return;
            }

            const decoded = jwt.verify(token, JWT_SECRET);

            const email = decoded.email;

            socket.join(canvasId);

            console.log(`${socket.id} joined ${canvasId}`);

            const canvasData = await Canvas.loadCanvas(email, canvasId);

            socket.emit("loadCanvas", canvasData);

        } catch (error) {

            console.error(error);

            socket.emit("unauthorized", {
                message: error.message,
            });

        }

    });

    // ✅ Synchronize the whole canvas
    socket.on("drawingUpdate", async ({ canvasId, elements }) => {

        try {

            await Canvas.findByIdAndUpdate(
                canvasId,
                {
                    elements,
                },
                {
                    returnDocument: "after",
                }
            );

            socket.to(canvasId).emit(
                "receiveDrawingUpdate",
                elements
            );

        } catch (error) {

            console.error(error);

        }

    });

    socket.on("disconnect", () => {

        console.log("User disconnected:", socket.id);

    });

});

const PORT = process.env.PORT || 3030;

server.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

});