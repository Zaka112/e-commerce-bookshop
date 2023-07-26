import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../../redux/store";
import { getBookDetailData } from "../../redux/thunk/books";
import { Book } from "../../types/types";
import { cartListActions } from "../../redux/slices/cart";

export default function BookDetails() {
  
  const bookDetails = useSelector((state: RootState) => state.bookDetail.book);

  const [currentImage, setCurrentImage] = useState(`${bookDetails?.images[0]}`);

  useEffect(() => {
    setCurrentImage(`${bookDetails?.images[0]}`);
  }, [bookDetails]);

  const isLoading = useSelector(
    (state: RootState) => state.bookDetail.isLoading
  );

  const cartItems = useSelector((state: RootState) => state.cartList.cartItems);
  const isInCart = cartItems.some(
    (cartItem) => cartItem._id === bookDetails?._id
  );
  const dispatch = useDispatch();
  const dispatchApp = useDispatch<AppDispatch>();
  const { bookId } = useParams<{ bookId: string }>();
  const bookDetailURL = `http://localhost:5001/books/${bookId}`;

  function addToCart(book: Book): void {
    if (!isInCart) {
      dispatch(cartListActions.addToCart(book));
      toast.success(`${book.title} successfully added to the cart`, {
        position: "top-left",
        autoClose: 5000,
        progress: undefined,
        theme: "light",
      });
    }
  }
  function alreadyInCart(): void {
    toast.info("This item is already in the cart!", {
      position: "top-center",
      progress: undefined,
      theme: "light",
    });
  }

  useEffect(() => {
    dispatchApp(getBookDetailData(bookDetailURL));
  }, [dispatchApp, bookDetailURL]);

  function changeImage(image: string) {
    setCurrentImage(image);
  }
  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else
    return (
      <Paper
        sx={{
          display: "flex",

          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            margin: 5,
            display: "flex",
          }}
        >
          <Card sx={{ minWidth: 600, minHeight: 600 }}>
            <CardMedia
              component="img"
              alt="Book Image"
              height={600}
              width={600}
              image={currentImage}
            />
          </Card>
          <Card sx={{ minWidth: 600, minHeight: 600 }}>
            <Paper sx={{ display: "flex", justifyContent: "center" }}>
              {bookDetails?.images
                ? Object.entries(bookDetails.images).map((images) => {
                    return (
                      <Paper key={uuidv4()} sx={{ padding: 0.5 }}>
                        <img
                          src={images[1]}
                          width={100}
                          height={100}
                          alt={bookDetails?.title}
                          onClick={() => changeImage(images[1])}
                        />
                      </Paper>
                    );
                  })
                : null}
            </Paper>
            <Paper>
              <Typography gutterBottom variant="h5" component="div">
                {bookDetails?.title}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                {bookDetails?.description}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                Price: {bookDetails?.price} $
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {bookDetails?.category}
              </Typography>

              <Link to="/books" style={{ color: "inherit" }}>
                <Button size="small" style={{ color: "inherit" }}>
                  Back to shop
                </Button>
              </Link>
              <Button
                size="small"
                style={{ color: "inherit" }}
                onClick={
                  bookDetails !== null && !isInCart
                    ? () => addToCart(bookDetails)
                    : () => alreadyInCart()
                }
              >
                Add to cart
              </Button>
              <Link to="/cart" style={{ color: "inherit" }}>
                <Button size="small" style={{ color: "inherit" }}>
                  go to cart
                </Button>
              </Link>
            </Paper>
          </Card>
        </Box>
      </Paper>
    );
}
