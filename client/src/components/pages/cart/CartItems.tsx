import React from "react";

import {
  Box,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { cartListActions } from "../../../redux/slices/cart";
import { BookOrder } from "../../../types/types";

type Prop = { cartItem: BookOrder };

export default function CartItems({ cartItem }: Prop) {
  const dispatch = useDispatch();

  function increaseItem() {
    dispatch(cartListActions.increaseQuantity(cartItem));
  }
  function removeItem() {
    dispatch(cartListActions.removeFromCart(cartItem));
  }
  function decreaseItem() {
    dispatch(cartListActions.decreaseQuantity(cartItem));
  }

  return (
    <Paper sx={{ margin: 1 }}>
      <Grid>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            marginLeft: 3,
            alignItems: "center",
          }}
        >
          <Tooltip title="Item Details" arrow placement="left-start">
            <Link to={`/books/${cartItem._id}`}>
              <img src={cartItem.images[0]} width={70} alt={cartItem.title} />
            </Link>
          </Tooltip>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography fontSize={18} fontWeight="bold">
              {cartItem.title}
            </Typography>
            <Typography>Price: $ {cartItem.price}</Typography>
            <IconButton onClick={removeItem} sx={{ color: "red" }}>
              <Tooltip title="remove Item" arrow placement="bottom">
                <DeleteForeverIcon />
              </Tooltip>
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton onClick={increaseItem}>
              <Tooltip title="increase quantity" arrow placement="top">
                <KeyboardArrowUpIcon />
              </Tooltip>
            </IconButton>
            <Typography> {cartItem?.counter} </Typography>
            <IconButton onClick={decreaseItem}>
              <Tooltip title="decrease quantity" arrow placement="bottom">
                <KeyboardArrowDownIcon />
              </Tooltip>
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Paper>
  );
}
