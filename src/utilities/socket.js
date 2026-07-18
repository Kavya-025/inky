import { io } from "socket.io-client";
import API_URL from "../config";

const socket = io(API_URL, {
    autoConnect: false,
    extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export default socket;