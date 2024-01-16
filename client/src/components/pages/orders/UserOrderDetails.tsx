import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { AppDispatch, RootState } from "redux/store";
import { getOrderDetails } from "redux/thunk/orders";
import NotFound from "../../Error";
import { useNavigate, useParams } from "react-router-dom";

export default function UserOrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const orderDetails = useSelector(
    (state: RootState) => state.orders.userOrderDetails
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);
  if (orderDetails) {
    return (
      <div>
        {" "}
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Typography>
          Order Details for{" "}
          <Typography variant="h5" component="div" fontWeight="bold">
            {orderDetails.firstName}
          </Typography>{" "}
          created at {new Date(orderDetails.orderedAt).toLocaleDateString()}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800 }}
                  component="h1"
                >
                  Items
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800 }}
                  component="h1"
                >
                  Name of book
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800 }}
                  component="h1"
                >
                  Quantity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800 }}
                  component="h1"
                >
                  Price each book
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {orderDetails.bookList.map((book) => {
            return (
              <TableBody>
                <TableRow>
                  <TableCell>
                    Item no. {orderDetails.bookList.indexOf(book, 0) + 1}
                  </TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.counter}</TableCell>
                  <TableCell sx={{ textDecoration: "none" }}>
                    {book.price}
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
        <Typography variant="h4" fontFamily="bold">
          {" "}
          Total Order Price: {orderDetails.totalOrderPrice}{" "}
        </Typography>
      </div>
    );
  } else {
    return <NotFound />;
  }
}
