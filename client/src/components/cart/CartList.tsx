import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import CartItems from "./CartItems";
import { RootState } from "../../redux/store";
import { cartListActions } from "../../redux/slices/cart";
import axios from "axios";

export default function CartList() {
  const bookList = useSelector((state: RootState) => state.cartList.cartItems);
  console.log(bookList);
  const dispatch = useDispatch();

  function checkOut() {
    const userId = "64b5c3246d4e91396ae70178"; // for testing
    const order = { userId: userId, bookList: bookList };
    const endpoint = "http://localhost:5001/orders";

    axios
      .post(endpoint, order)
      .then((response) => {
        console.log(response); // test
        dispatch(cartListActions.checkOut());
      })
      .then((error) => console.log(error));
  }
  const total = bookList.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.counter;
  }, 0);

  return (
    <Paper sx={{ marginTop: 10, minHeight: 700 }}>
      <Typography variant="h1" component="div">
        Your Cart
      </Typography>

      {bookList.length === 0 ? (
        <Typography variant="h2" component="div">
          No item in the cart!
        </Typography>
      ) : (
        bookList.map((cartItem) => {
          return <CartItems cartItem={cartItem} key={cartItem._id} />;
        })
      )}
      {bookList.length === 0 ? (
        <Link to="/books" style={{ color: "inherit" }}>
          <Button size="large" sx={{ color: "inherit" }}>
            Back to Shoping
          </Button>{" "}
        </Link>
      ) : (
        <Paper>
          <Link to="/books" style={{ color: "inherit" }}>
            {" "}
            <Button size="large" sx={{ color: "inherit" }}>
              Add more items to the cart
            </Button>{" "}
          </Link>
        </Paper>
      )}
      <br />
      <Typography variant="h3" component="div">
        {" "}
        Total Amount: $ {total.toLocaleString()}
      </Typography>

      {bookList.length > 0 ? (
        <Button
          sx={{ color: "inherit" }}
          onClick={() => {
            checkOut();
            toast.success(` Thanks for Shoping here. Come back soon`, {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }}
        >
          Check Out
        </Button>
      ) : null}
      {bookList.length > 0 ? (
        <Button onClick={() => checkOut()} sx={{ color: "inherit" }}>
          Remove Cart
        </Button>
      ) : null}
    </Paper>
  );
}
