import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';

import CartItems from "./CartItems";
import { RootState } from "../../redux/store";
import { cartListActions } from "../../redux/slices/cart";
import axios from "axios";
import { BASE_URL } from "../../api";

export default function CartList() {
  const cartList = useSelector((state: RootState) => state.cartList.cartItems);
  const userInformation = useSelector(
    (state: RootState) => state.users.userInformation
  );
  const userId = userInformation?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("userToken");

  function checkOut() {
    const newOrder = { bookList: cartList, totalOrderPrice: totalOrderPrice };
    const endPoint = `${BASE_URL}/orders/${userId}`;

    axios
      .post(endPoint, newOrder, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response); // test
        if (response.status === 201) {
          toast.info("Successfully completed. Thanks for shoping with us. Come back soon :)", {
            position: "top-center",
            progress: undefined,
            theme: "light",
          });
          dispatch(cartListActions.emptyCart()); // empty cart
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error(
            `Error retrieving resource. Please make sure:
          • the resource server is accessible
          • you're logged in`,
            {
              position: "top-left",
              progress: undefined,
              theme: "light",
            }
          );
        }
      });
  }
  const totalOrderPrice = cartList.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.counter;
  }, 0);

  function removeCart(): void {
    //alert message beofer removing
    dispatch(cartListActions.emptyCart());
  }

  return (
    <Paper sx={{ minHeight: 700 }}>
      <Typography variant="h3" component="div">
        Cart
      </Typography>

      {cartList.length === 0 ? (
        <Typography variant="h2" component="div">
          No item in the cart!
        </Typography>
      ) : (
        cartList.map((cartItem) => {
          return <CartItems cartItem={cartItem} key={cartItem._id} />;
        })
      )}
      {cartList.length === 0 ? (
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
        Total Amount: $ {totalOrderPrice.toLocaleString()}
      </Typography>

      {cartList.length > 0 ? (
        <Button
          sx={{ color: "inherit" }}
          onClick={() => {
            checkOut();
          }}
        >
          Check Out
        </Button>
      ) : null}
      {cartList.length > 0 ? (
        <Button onClick={() => onCheckOut()} sx={{ color: "inherit" }}>
          Remove Cart
        </Button>
      ) : null}
    </Paper>
  );
 function onCheckOut () {
    confirmAlert({
      title: 'Confirm to Proceed',
      message: 'Are you sure to remove cart?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeCart(),
          color:"#fffccc"
        },
        {
          label: 'No',
          onClick: () => navigate("/cart")
        }
      ]
    });
  };
}
