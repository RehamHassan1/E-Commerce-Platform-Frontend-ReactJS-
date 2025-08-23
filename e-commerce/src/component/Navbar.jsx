import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <h2 className="logo">E-Commerce</h2>
            <div className="nav-links">
                <Link to="/home" className="nav-link">Home</Link>
                <Link to="/cart" className="nav-link">Cart</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
                <Link to="/logout" className="nav-link">Logout</Link>
            </div>
        </div>
    );
};

export default Navbar;
