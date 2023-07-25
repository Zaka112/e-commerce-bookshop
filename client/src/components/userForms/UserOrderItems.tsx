import React from "react";
import { Order } from "../../types/types";
import { TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type Prop = {
  order: Order;
  page: number;
  rowsPerPage: number;
};

export default function UserOrderItems({ order, page, rowsPerPage }: Prop) {
  let counter = 0;

  return (
    <TableRow key={order._id}>
      <TableCell>{(counter = counter + 1)}</TableCell>
      <TableCell>{order._id}</TableCell>
      <TableCell>{new Date(order.orderedAt).toLocaleDateString()}</TableCell>

      <TableCell>
        <Link to={`/orders/orderdetails/${order._id}`}>
          <KeyboardArrowRightIcon />
        </Link>
      </TableCell>
    </TableRow>
  );
}
