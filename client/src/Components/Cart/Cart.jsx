import React from "react";
import "./Cart.css"; // Ensure this file exists in the same directory
import "../../styles.css"; // If you're using global styles from src/styles.css

function Cart({ cartItems, onCheckout }) {
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>
                {item.title} x {item.quantity}
              </p>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={onCheckout}>Checkout</button>{" "}
          {/* Call onCheckout here */}
        </>
      )}
    </div>
  );
}

export default Cart;
