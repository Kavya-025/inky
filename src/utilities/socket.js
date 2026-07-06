import { io } from "socket.io-client";

const socket = io("http://localhost:3030", {
    autoConnect: false,
    extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export default socket;