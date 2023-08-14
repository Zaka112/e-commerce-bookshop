import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  CardMedia,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-toastify";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import wishListImage from "../../../assets/heartbook.png";
import { cartListActions } from "../../../redux/slices/cart";
import { RootState } from "../../../redux/store";
import { Book } from "../../../types/types";
import { bookActions } from "../../../redux/slices/books";

export default function FavoriteList() {
  const favoriteBooks = useSelector((state: RootState) => state.books.favorite);

  const dispatch = useDispatch();

  function removeFavorite(favBook: Book): void {
    dispatch(bookActions.removeFavoriteBook(favBook));
  }

  const cartItems = useSelector((state: RootState) => state.cartList.cartItems);

  function addToCart(book: Book): void {
    const isInCart = cartItems.some((cartItem) => cartItem._id === book._id);
    if (!isInCart) {
      dispatch(cartListActions.addToCart(book));
      toast.success(`${book.title} successfully added to the cart`, {
        position: "top-left",
        autoClose: 5000,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.info(`${book.title} is already in the cart!`, {
        position: "top-center",
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Paper
            sx={{
              marginTop: 8,
              height: 600,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ backgroundColor: "inherit" }}
            >
              Wish List
            </Typography>
            {favoriteBooks.length === 0 ? (
              <Box component="div" sx={{ maxWidth: 380, margin: 1 }}>
                <CardMedia
                  component="img"
                  height="500px"
                  image={wishListImage}
                  alt="favorite"
                />

                <Typography variant="h5" component="div">
                  Empty?
                </Typography>
                <Tooltip title="Go To Shop" arrow placement="right">
                  <Link to="/books">
                    <Button variant="contained" size="small">
                      Bring some in!
                    </Button>{" "}
                  </Link>
                </Tooltip>
              </Box>
            ) : (
              favoriteBooks.map((favItem) => {
                return (
                  <Box
                    margin={1}
                    key={favItem._id}
                    sx={{
                      display: "flex",
                      gap: "2rem",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Tooltip title="Book Details" arrow placement="left">
                      <Link to={`/books/${favItem._id}`}>
                        <img
                          src={favItem.images[0]}
                          width={70}
                          alt={favItem.title}
                        />
                      </Link>
                    </Tooltip>
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Typography>{favItem.title}</Typography>
                      <Typography>Price: ${favItem.price}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",

                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => removeFavorite(favItem)}
                        sx={{ color: "red" }}
                      >
                        <Tooltip title="Remove" arrow>
                          <DeleteForeverIcon />
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        aria-label="add to cart"
                        onClick={() => addToCart(favItem)}
                      >
                        <AddShoppingCartIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })
            )}
          </Paper>
        </React.Fragment>
      ))}
    </div>
  );
}
