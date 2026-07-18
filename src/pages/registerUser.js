import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

function RegisterUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message);
                return;
            }
            alert("Registration successful!");
            navigate("/login");
        } catch (err) {
            setError("Unable to register.");
            console.error(err);
        }
    };
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <form
                onSubmit={register}
                style={{
                    background: "#fff",
                    padding: "40px",
                    borderRadius: "15px",
                    width: "360px",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        color: "#333",
                        margin: 0,
                    }}
                >
                    Register
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "#666",
                        marginTop: "-5px",
                    }}
                >
                    Create your account
                </p>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                    }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                    }}
                />
                {error && (
                    <div
                        style={{
                            color: "#d32f2f",
                            background: "#fdecea",
                            border: "1px solid #f5c2c7",
                            padding: "10px",
                            borderRadius: "8px",
                            textAlign: "center",
                            fontSize: "14px",
                        }}
                    >
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    style={{
                        padding: "12px",
                        background: "#4f46e5",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    Register
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    style={{
                        padding: "12px",
                        background: "transparent",
                        border: "1px solid #4f46e5",
                        color: "#4f46e5",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    Back to Login
                </button>
            </form>
        </div>
    );
}

export default RegisterUser;