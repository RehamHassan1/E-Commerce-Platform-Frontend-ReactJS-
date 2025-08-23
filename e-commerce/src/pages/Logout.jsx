import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Simple.css";

const Logout = () => {
    const navigate = useNavigate();
    const didRun = useRef(false);
    useEffect(() => {
        if (didRun.current) return; 
        didRun.current = true;
        const logoutUser = async () => {
            try {
                await fetch("http://localhost:5001/auth/logout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
                localStorage.removeItem("token");
                alert("Logged out successfully!");
            } catch (err) {
                console.error(err);
                alert("Logout failed!");
            }
        };
        logoutUser();
    },
    );
    return (
        <div className="container">
            <div className="header">
                <div className="text">Logout</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <p>You have been logged out successfully.</p>
                <div className="submit-container">
                    <button onClick={() => navigate("/login")} className="submit">
                        Login Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;
