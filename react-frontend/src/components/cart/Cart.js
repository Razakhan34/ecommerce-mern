import React, { Fragment } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, itemRemoveFromCart } from "../../store/cart-actions";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import "./Cart.css";

import CartItemCard from "./CartItemCard.js";
import { Typography } from "@mui/material";
import { Link, useHistory } from "react-router-dom";

const Cart = () => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const grossTotal = cartItems
    .map((item) => item.quantity * item.price)
    .reduce((acc, curr) => acc + curr, 0);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      alert.error("Product has reach maximum stock");
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) return;
    dispatch(addItemToCart(id, newQty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(itemRemoveFromCart(id));
    alert.success("item remove from cart");
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 && (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">Add Product Now</Link>
        </div>
      )}
      {cartItems.length > 0 && (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((currItem) => (
                <div className="cartContainer" key={currItem.product}>
                  <CartItemCard
                    item={currItem}
                    onRemoveCartItem={removeFromCartHandler}
                  />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(currItem.product, currItem.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={currItem.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          currItem.product,
                          currItem.quantity,
                          currItem.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    currItem.price * currItem.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${grossTotal}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
