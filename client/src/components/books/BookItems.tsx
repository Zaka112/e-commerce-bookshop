import * as React from "react";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";

import { Book } from "../../types/types";
import { RootState } from "../../redux/store";
import { bookActions } from "../../redux/slices/books";


const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

type Prop = {
  bookItem: Book;
};
export default function BookItems({ bookItem }: Prop) {
  const favoriteBooks = useSelector((state: RootState) => state.books.favorite);

  const isFavorite = favoriteBooks.some(
    (favoriteItem) => favoriteItem._id === bookItem._id
  );

  const dispatch = useDispatch();

  function handelFavoriteProductIcon(book: Book): void {
    if (!isFavorite) {
      dispatch(bookActions.addFavoriteProducts(book));
      toast.success(`${book.title} has been added to favorite list`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      dispatch(bookActions.deleteFavoriteProducts(book));
      toast.success(`${book.title} removed from favorite list`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Link
              to={`/books/${bookItem._id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              <Img alt="complex" src={bookItem.images[0]} />
            </Link>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {bookItem.title}
              </Typography>
              {/* <Typography variant="body2" gutterBottom>
          {bookItem.description}
          </Typography> */}
              <Typography variant="body2" color="text.secondary">
                ISBN: {bookItem.isbn}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                <Button size="small" style={{ color: "inherit" }}>
                  <IconButton>
                    <AddShoppingCartIcon fontSize="small" />
                  </IconButton>
                </Button>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                handelFavoriteProductIcon(bookItem);
              }}
              sx={isFavorite ? { color: "red" } : { color: "inherit" }}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
            <Typography variant="subtitle1" component="div">
              ${bookItem.price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
