import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getOrderDetails } from "../../redux/thunk/orders";
import { Button, Paper } from "@mui/material";
import NotFound from "../Error";
import { useNavigate, useParams } from "react-router-dom";

export default function UserOrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const orderDetails = useSelector(
    (state: RootState) => state.orders.userOrderDetails
  );
  const dispatch = useDispatch<AppDispatch>();
  console.log(orderDetails);
  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);
  if (orderDetails) {
    return (
      <div>
        {" "}
        <Button onClick={() => navigate(-1)}>Back</Button>UserOrderDetails
        {orderDetails.bookList.map((book) => {
          return (
            //TODO: Proper display
            <Paper sx={{minHeight:600}}>
              {book.title} -- {book.counter}
            </Paper>
          );
        })}
      </div>
    );
  } else {
    return <NotFound />;
  }
}
