import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Logged in:", data);
        alert("Login successful!");

        if (data.token) localStorage.setItem("token", data.token);
        if (data.role) localStorage.setItem("role", data.role);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          try {
            const userRes = await fetch("http://localhost:5001/auth/profile", {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${data.token}`,
                "Content-Type": "application/json"
              },
            });

            if (userRes.ok) {
              const userData = await userRes.json();
              localStorage.setItem("user", JSON.stringify(userData));
            }
          } catch (err) {
            console.error("Error fetching user data:", err);
          }
        }

        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        alert(data.message || "Invalid email or password!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="email icon" />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="password icon" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="submit-container">
          <button className="submit" onClick={handleLogin}>
            Login
          </button>
          <Link to="/register" className="submit">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;