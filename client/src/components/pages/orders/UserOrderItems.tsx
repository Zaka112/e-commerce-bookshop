import React, { useState } from "react";

import { TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { Order } from "types/types";

type Prop = {
  order: Order;
  orderNumber: number;
};

export default function UserOrderItems({ order, orderNumber }: Prop) {
  // numBr
  return (
    <TableRow key={order._id}>
      <TableCell>{orderNumber + 1}</TableCell>
      <TableCell>{order._id}</TableCell>
      <TableCell>{new Date(order.orderedAt).toLocaleDateString()}</TableCell>
      <TableCell>{order.bookList.length}</TableCell>
      <TableCell>{order.totalOrderPrice}</TableCell>
      <TableCell sx={{ textDecoration: "none" }}>
        <Link to={`/orders/orderdetails/${order._id}`}>
          <KeyboardArrowRightIcon />
        </Link>
      </TableCell>
    </TableRow>
  );
}
