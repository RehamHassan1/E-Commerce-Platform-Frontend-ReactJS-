import "./Simple.css";

const Checkout = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="text">Checkout</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" placeholder="Shipping Address" />
                </div>
                <div className="input">
                    <input type="text" placeholder="Payment Method" />
                </div>
                <div className="submit-container">
                    <div className="submit">Place Order</div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
