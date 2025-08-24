import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./Simple.css";

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [reviews, setReviews] = useState([5, 4, 5]); 
    const [rating, setRating] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5001/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`${product.name} added to cart!`);
    };

    const averageRating =
        reviews.length > 0 ? reviews.reduce((a, b) => a + b, 0) / reviews.length : 0;

    const renderStars = (stars, clickable = false) =>
        [...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
                <span
                    key={index}
                    onClick={() => clickable && setRating(starValue)}
                    style={{
                        cursor: clickable ? "pointer" : "default",
                        color:
                            starValue <= (clickable ? rating : stars)
                                ? "gold"
                                : "lightgray",
                        fontSize: "22px",
                    }}
                >
                    ★
                </span>
            );
        });

    const handleAddReview = () => {
        if (rating === 0) return alert("Please select stars before submitting!");
        setReviews([...reviews, rating]);
        setRating(0);
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{product.name}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img
                        src={product.image || "default-image.png"}
                        alt={product.name}
                        style={{ width: "300px", borderRadius: "8px" }}
                    />
                </div>
                <div className="input">
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Stock:</strong> {product.stock}</p>
                </div>
                <div className="input">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        min={1}
                        max={product.stock}
                        value={quantity}
                        onChange={e =>
                            setQuantity(Math.min(product.stock, Math.max(1, Number(e.target.value))))
                        }
                    />
                </div>
                <div className="submit-container">
                    <button className="submit" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                    <Link to="/cart" className="submit">Go to Cart</Link>
                    <Link to="/home" className="submit">Back to Categories</Link>
                </div>
            </div>
            <div className="reviews" style={{ marginTop: "20px" }}>
                <h3>Reviews</h3>
                <p>
                    Average Rating: {averageRating.toFixed(1)} / 5
                    <span style={{ marginLeft: "10px" }}>
                        {renderStars(Math.round(averageRating))}
                    </span>
                </p>

                <div style={{ marginTop: "15px" }}>
                    <h4>Add Your Review</h4>
                    <div>{renderStars(rating, true)}</div>
                    <button
                        className="submit"
                        onClick={handleAddReview}
                        style={{ marginTop: "10px" }}
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
