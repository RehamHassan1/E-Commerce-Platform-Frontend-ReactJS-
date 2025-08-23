import { Link } from "react-router-dom";
import { useState } from "react";
import "./Simple.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Product 1", price: 100, quantity: 1 },
        { id: 2, name: "Product 2", price: 50, quantity: 2 },
    ]);

    const increaseQty = (id) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

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
                    cartItems.map((item) => (
                        <div className="input" key={item.id}>
                            <p>
                                {item.name} - ${item.price} × {item.quantity} = $
                                {item.price * item.quantity}
                            </p>
                            <div className="submit-container">
                                <button className="submit" onClick={() => decreaseQty(item.id)}>
                                    –
                                </button>
                                <button className="submit" onClick={() => increaseQty(item.id)}>
                                    +
                                </button>
                                <button className="submit" onClick={() => removeItem(item.id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}

                {cartItems.length > 0 && (
                    <>
                        <div className="input">
                            <p>
                                <strong>Total: ${total}</strong>
                            </p>
                        </div>
                        <div className="submit-container">
                            <Link to="/checkout" className="submit">
                                Checkout
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
