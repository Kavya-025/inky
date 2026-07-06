import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Board from "../components/Board";
import Toolbar from "../components/toolbar";
import Toolbox from "../components/toolbox";

import BoardProvider from "../store/boardProvider";
import ToolboxProvider from "../store/toolbox-context-provider";
import boardContext from "../store/board-context";

import socket from "../utilities/socket";

function CanvasSocketHandler() {

    const { setElements } = useContext(boardContext);

    useEffect(() => {

        socket.on("receiveDrawingUpdate", (elements) => {

            console.log("Received drawing update:", elements);

            setElements(elements);

        });

        return () => {
            socket.off("receiveDrawingUpdate");
        };

    }, [setElements]);

    return null;
}

function CanvasPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [canvas, setCanvas] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const loadCanvas = async () => {

            try {

                const response = await fetch(
                    `http://localhost:3030/canvas/load/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Unable to load canvas");
                }

                const canvasData = await response.json();

                setCanvas(canvasData);

                if (!socket.connected) {
                    socket.connect();
                }

                console.log("Current user token:", localStorage.getItem("token"));
                console.log("Canvas ID:", id);

                socket.emit("joinCanvas", {
                    canvasId: id,
                });

            } catch (err) {

                console.log(err);

            }

        };

        loadCanvas();

        socket.on("loadCanvas", (updatedCanvas) => {

            console.log("Received canvas:", updatedCanvas);

            setCanvas(updatedCanvas);

        });

        socket.on("unauthorized", (data) => {

            alert(data.message);

            navigate("/profile");

        });

        return () => {

            socket.off("loadCanvas");
            socket.off("unauthorized");

        };

    }, [id, navigate]);

    if (!canvas) {
        return <h2>Loading Canvas...</h2>;
    }

    return (
        <BoardProvider initialElements={canvas.elements}>
            <ToolboxProvider>

                <CanvasSocketHandler />

                <Toolbar />
                <Board />
                <Toolbox />

            </ToolboxProvider>
        </BoardProvider>
    );
}

export default CanvasPage;