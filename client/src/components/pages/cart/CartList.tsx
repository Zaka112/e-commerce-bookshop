import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import { Stripe, loadStripe } from "@stripe/stripe-js";

import { getPublishableKey } from "redux/thunk/books";
import CartItems from "./CartItems";
import { RootState } from "redux/store";
import { cartListActions } from "redux/slices/cart";
import { BASE_URL } from "api";

export default function CartList() {
  const cartList = useSelector((state: RootState) => state.cartList.cartItems);
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );
  const userId = userInformation?._id;
  const firstName = userInformation?.firstName;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("userToken");

useEffect(() => {
  dispatch(getPublishableKey());
  }, []);
  const publishableKey = useSelector((state: RootState) => state.bookDetail.publishableKey);
  console.log(publishableKey)
  const checkOut = async () => {
    // const getPublishableKey = await fetch(`${BASE_URL}/secret/config`);
    // const { publishableKey } = await getPublishableKey.json();

    const stripe = await loadStripe(publishableKey);
    const newOrder = {
      bookList: cartList,
      totalOrderPrice: totalOrderPrice,
      firstName: firstName,
    };
    // const endPoint = `${BASE_URL}/orders/${userId}`;
    const endPoint = `${BASE_URL}/secret`;
  
    const response = await axios.post(endPoint, newOrder, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const session = await response.data;

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      alert("error");
    }
   
  };
  const totalOrderPrice = cartList.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.counter;
  }, 0);

  function removeCart(): void {
    //alert message beofer removing
    dispatch(cartListActions.emptyCart());
  }

  return (
    <Paper sx={{ minHeight: 200 }}>
      {cartList.length === 0 ? (
        <Typography variant="h5" component="div">
          Your cart is empty, return to the{" "}
          <Button size="large" onClick={() => navigate("/books")}>
            books
          </Button>{" "}
          page.
        </Typography>
      ) : (
        <Grid container>
          {cartList.map((cartItem) => {
            return <CartItems cartItem={cartItem} key={cartItem._id} />;
          })}
        </Grid>
      )}

      <Typography variant="h5" component="div" fontWeight="bold">
        {" "}
        Total Amount: $ {totalOrderPrice.toLocaleString()}
      </Typography>

      {cartList.length > 0 ? (
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            checkOut();
          }}
        >
          Check Out
        </Button>
      ) : null}
      <br />
      {cartList.length > 0 ? (
        <Button onClick={() => onRemove()}>Remove Cart</Button>
      ) : null}
      {cartList.length !== 0 ? (
        <Paper>
          <Link to="/books" style={{ color: "inherit" }}>
            <Button>Add more items</Button>{" "}
          </Link>
        </Paper>
      ) : null}
    </Paper>
  );
  function onRemove() {
    confirmAlert({
      title: "Confirm to Proceed",
      message: "Are you sure to remove cart?.",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeCart(),
          color: "#fffccc",
        },
        {
          label: "No",
          onClick: () => navigate("/cart"),
        },
      ],
    });
  }
}
