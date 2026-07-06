import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Profile() {

    const [user, setUser] = useState(null);
    const [canvases, setCanvases] = useState([]);
    const [canvasName, setCanvasName] = useState("");

    const [showShareBox, setShowShareBox] = useState(false);
    const [shareEmail, setShareEmail] = useState("");
    const [selectedCanvasId, setSelectedCanvasId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`
        };

        // Fetch profile
        fetch("http://localhost:3030/users/profile", {
            headers
        })
        .then(async (res) => {
            if (!res.ok) {
                localStorage.removeItem("token");
                navigate("/login");
                return null;
            }
            return res.json();
        })
        .then((data) => {
            if (data) {
                setUser(data.user);
            }
        })
        .catch(() => {
            localStorage.removeItem("token");
            navigate("/login");
        });

        // Fetch canvases
        fetch("http://localhost:3030/canvas", {
            headers
        })
        .then(async (res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch canvases");
            }
            return res.json();
        })
        .then((data) => {
            setCanvases(data);
        })
        .catch((err) => {
            console.log(err);
        });

    }, [navigate]);

    const createCanvas = async () => {

        if (!canvasName.trim()) {
            alert("Please enter a canvas name.");
            return;
        }

        const token = localStorage.getItem("token");

        try {

            const response = await fetch("http://localhost:3030/canvas", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    name: canvasName
                })

            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            setCanvases([...canvases, data]);
            setCanvasName("");

        } catch (error) {
            console.log(error);
        }
    };

    const shareCanvas = async () => {

        if (!shareEmail.trim()) {
            alert("Please enter an email.");
            return;
        }

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                `http://localhost:3030/canvas/share/${selectedCanvasId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        shared_with: shareEmail
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Canvas shared successfully!");

            setShowShareBox(false);
            setShareEmail("");
            setSelectedCanvasId(null);

        } catch (error) {
            console.log(error);
        }
    };

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f5f7fb",
                padding: "40px",
                fontFamily: "Arial"
            }}
        >

            <h1
                style={{
                    color: "#333",
                    marginBottom: "30px"
                }}
            >
                Hello, {user.name} 👋
            </h1>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "40px"
                }}
            >
                <input
                    type="text"
                    placeholder="Canvas name"
                    value={canvasName}
                    onChange={(e) => setCanvasName(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px"
                    }}
                />

                <button
                    onClick={createCanvas}
                    style={{
                        padding: "12px 20px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#4f46e5",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    + Create Canvas
                </button>
            </div>

            <h2>Your Canvases</h2>

            {canvases.length === 0 ? (

                <p>No canvases found.</p>

            ) : (

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "20px",
                        marginTop: "20px"
                    }}
                >
                    {canvases.map((canvas) => (

                        <div
                            key={canvas._id}
                            style={{
                                background: "white",
                                borderRadius: "12px",
                                padding: "20px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                            }}
                        >

                            <h3
                                style={{
                                    margin: 0,
                                    color: "#4f46e5"
                                }}
                            >
                                {canvas.name}
                            </h3>

                            <p
                                style={{
                                    marginTop: "15px",
                                    color: "#666"
                                }}
                            >
                                Elements: {canvas.elements.length}
                            </p>

                            <p
                                style={{
                                    color: "#666"
                                }}
                            >
                                Shared With: {canvas.sharedWith.length}
                            </p>

                            <p
                                style={{
                                    fontSize: "12px",
                                    color: "#999",
                                    marginBottom: "20px"
                                }}
                            >
                                Created: {new Date(canvas.createdAt).toLocaleString()}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px"
                                }}
                            >
                                <button
                                    onClick={() => {
                                        navigate(`/canvas/${canvas._id}`);
                                    }}
                                    style={{    
                                        flex: 1,
                                        padding: "10px",
                                        border: "none",
                                        borderRadius: "8px",
                                        background: "#4f46e5",
                                        color: "white",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Open Canvas
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedCanvasId(canvas._id);
                                        setShowShareBox(true);
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: "10px",
                                        border: "none",
                                        borderRadius: "8px",
                                        background: "#16a34a",
                                        color: "white",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Share
                                </button>
                            </div>

                        </div>

                    ))}
                </div>

            )}

            {showShareBox && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.4)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "30px",
                            borderRadius: "12px",
                            width: "350px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                        }}
                    >
                        <h3>Share Canvas</h3>

                        <input
                            type="email"
                            placeholder="Enter user's email"
                            value={shareEmail}
                            onChange={(e) => setShareEmail(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginTop: "15px",
                                marginBottom: "20px",
                                borderRadius: "8px",
                                border: "1px solid #ccc"
                            }}
                        />

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <button
                                onClick={() => {
                                    setShowShareBox(false);
                                    setShareEmail("");
                                    setSelectedCanvasId(null);
                                }}
                                style={{
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "8px",
                                    background: "#999",
                                    color: "white",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={shareCanvas}
                                style={{
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "8px",
                                    background: "#16a34a",
                                    color: "white",
                                    cursor: "pointer"
                                }}
                            >
                                Share
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default Profile;