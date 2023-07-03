import React from "react";
import CartItem from "./CartItem";
import "./Cart.css";
import { useSelector } from "react-redux";

const CartItems = () => {
  const cartItems = useSelector((state) => state.cart.itemsList);
  
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul>
        {/* loop through cartitems state and generate list of CartItem */}
        {cartItems.map((item) => {
          return(
            <li key={item.id}>
              <CartItem 
                quantity={item.quantity}
                id={item.id} 
                price={item.price} 
                total={item.totalPrice} 
                name={item.name} 
              />
            </li>
          )})
        }
      </ul>
    </div>
  );
};

export default CartItems;
