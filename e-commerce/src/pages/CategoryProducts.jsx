import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Simple.css";
import Navbar from "../component/Navbar";

const CategoryProducts = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5001/products?category=${encodeURIComponent(category)}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [category]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="header">
                    <div className="text">{category} Products</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div className="input" key={product.id}>
                                <h3>{product.name}</h3>
                                <p>Price: ${product.price}</p>
                                <p>Stock: {product.stock} available</p>
                                <Link to={`/product/${product.id}`} className="submit">View Details</Link>
                            </div>
                        ))
                    ) : (
                        <p>No products found in this category.</p>
                    )}
                    <div className="submit-container">
                        <Link to="/home" className="submit">Back to Categories</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryProducts;