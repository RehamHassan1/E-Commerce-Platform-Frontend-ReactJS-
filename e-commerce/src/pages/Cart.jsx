import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import "./Simple.css";

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, setCartItems } = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    const increaseQty = (id) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const placeOrder = async () => {
        if (cartItems.length === 0) return alert("Cart is empty!");
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5001/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: 1, // replace with userID
                    items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity }))
                })
            });
            if (!response.ok) throw new Error("Failed to place order");

            alert("Order placed successfully!");
            setCartItems([]);
            navigate("/checkout");
        } catch (err) {
            alert("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Cart</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    cartItems.map(item => (
                        <div className="input" key={item.id}>
                            <p>{item.name} - ${item.price} × {item.quantity} = ${item.price * item.quantity}</p>
                            <div className="submit-container">
                                <button className="submit" onClick={() => decreaseQty(item.id)}>–</button>
                                <button className="submit" onClick={() => increaseQty(item.id)}>+</button>
                                <button className="submit" onClick={() => removeItem(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))
                )}

                {cartItems.length > 0 && (
                    <>
                        <div className="input"><p><strong>Total: ${total}</strong></p></div>
                        <div className="submit-container">
                            <button className="submit" onClick={placeOrder} disabled={loading}>
                                {loading ? "Placing Order..." : "Place Order"}
                            </button>
                        </div>
                    </>
                )}
                {cartItems.length === 0 && (
                    <div className="submit-container">
                        <Link to="/home" className="submit">Back to Home</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
