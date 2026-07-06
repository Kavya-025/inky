import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        // Clear previous error
        setError("");

        try {
            const response = await fetch("http://localhost:3030/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            localStorage.setItem("token", data.token);

            navigate("/profile");
        } catch (err) {
            setError("Unable to connect to the server.");
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
                onSubmit={login}
                style={{
                    background: "#fff",
                    padding: "40px",
                    borderRadius: "15px",
                    width: "350px",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        color: "#333",
                        marginBottom: "10px",
                    }}
                >
                    Welcome Back
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "#666",
                        marginTop: "-10px",
                        marginBottom: "10px",
                    }}
                >
                    Login to continue
                </p>

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
                        outline: "none",
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
                        outline: "none",
                    }}
                />

                {error && (
                    <div
                        style={{
                            color: "#d32f2f",
                            backgroundColor: "#fdecea",
                            border: "1px solid #f5c6cb",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center",
                            fontSize: "14px",
                            fontWeight: "500",
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
                        transition: "0.2s",
                    }}
                    onMouseOver={(e) =>
                        (e.target.style.background = "#4338ca")
                    }
                    onMouseOut={(e) =>
                        (e.target.style.background = "#4f46e5")
                    }
                >
                    Login
                </button>
                <div
                        style={{
                            textAlign: "center",
                            marginTop: "5px",
                            color: "#666",
                            fontSize: "15px"
                        }}
                    >
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            style={{
                                color: "#4f46e5",
                                cursor: "pointer",
                                fontWeight: "bold",
                                textDecoration: "underline"
                            }}
                        >
                            Register
                        </span>
                    </div>
                    </form>
                </div>
    );
}

export default Login;