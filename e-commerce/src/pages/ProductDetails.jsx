import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Simple.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    useEffect(() => {
        fetch(`http://localhost:5001/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setReviews(data.reviews || []);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!product) return <p>Loading...</p>;
    const handleAddReview = () => {
        if (rating > 0) {
            setReviews([...reviews, rating]);
            setRating(0);
        }
    };

    const averageRating = reviews.length > 0
        ? reviews.reduce((a, b) => a + b, 0) / reviews.length
        : 0;

    const renderStars = (stars, clickable = false) =>
        [...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
                <span
                    key={index}
                    onClick={() => clickable && setRating(starValue)}
                    style={{
                        cursor: clickable ? "pointer" : "default",
                        color: starValue <= (clickable ? rating : stars) ? "gold" : "lightgray",
                        fontSize: "22px",
                    }}
                >
                    ★
                </span>
            );
        });

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
                </div>

                <div className="input">
                    <p><strong>Description:</strong> {product.description}</p>
                </div>

                <div className="input">
                    <p><strong>Price:</strong> ${product.price}</p>
                </div>

                <div className="input">
                    <p><strong>Stock Available:</strong> {product.stock}</p>
                </div>

                <div className="input">
                    <h3>Reviews:</h3>
                    {reviews.length > 0 ? (
                        <p>{renderStars(Math.round(averageRating))} ({reviews.length})</p>
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                    <div style={{ marginTop: "10px" }}>
                        <p><strong>Add Your Rating:</strong></p>
                        {renderStars(rating, true)}
                        <br />
                        <button
                            onClick={handleAddReview}
                            className="submit"
                            style={{ marginTop: "5px" }}
                        >
                            Submit Review
                        </button>
                    </div>
                </div>

                <div className="submit-container">
                    <Link to="/cart" className="submit">Add to Cart</Link>
                    <Link to="/home" className="submit">Back to Categories</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;