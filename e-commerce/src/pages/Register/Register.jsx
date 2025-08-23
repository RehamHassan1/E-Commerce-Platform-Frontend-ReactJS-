import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import './Register.css'
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
const Register = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    address: "",
    phone: "",
    password: ""
  });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleRegister = async () => {
    if (!form.userName || !form.email || !form.password) {
      alert("Please fill in all required fields (Name, Email, Password).");
      return; 
    }
    try {
      const res = await fetch("http://localhost:5001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log("Registered:", data);
      if (res.ok) {
        alert("Registration successful!");
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };
  return (
    <div className="container">
      <div className="header">
        <div className='text'>Register</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="Name" name="userName" value={form.userName} onChange={handleChange} />
        </div>

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="text" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
        </div>

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="text" placeholder="Address" name="address" value={form.address} onChange={handleChange} />
        </div>

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="text" placeholder="Phone" name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} />
        </div>

        <div className="submit-container">
          <button className="submit" onClick={handleRegister}>Register</button>
          <Link to="/login" className="submit">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
