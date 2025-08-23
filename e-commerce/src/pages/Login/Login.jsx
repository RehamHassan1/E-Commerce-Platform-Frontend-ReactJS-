import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import Admin from "../admin/admin";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role); 
        console.log("Response data:", data);

        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className='text'>Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="submit-container">
          <button className="submit" onClick={handleLogin}>Login</button>
          <Link to="/register" className="submit">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
