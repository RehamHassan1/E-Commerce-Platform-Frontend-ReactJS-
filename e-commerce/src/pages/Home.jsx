import { Link } from "react-router-dom";
import "./Simple.css";
import Navbar from "../component/Navbar";
import { useEffect, useState } from "react";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    const productsByCategory = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="header">
                    <div className="text">Products</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {Object.keys(productsByCategory).map((category) => (
                        <div className="input" key={category}>
                            <p>Category: {category}</p>
                            <Link to={`/category/${encodeURIComponent(category)}`} className="submit">View</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;