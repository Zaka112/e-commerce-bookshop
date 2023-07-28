import * as React from "react";

import { Typography, Paper, Grid, styled, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { Book } from "../../types/types";
import { RootState } from "../../redux/store";
import { bookActions } from "../../redux/slices/books";
import { toggleThemeActions } from "../../redux/slices/theme";

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
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme
  );

  const favoriteBooks = useSelector((state: RootState) => state.books.favorite);

  const isFavorite = favoriteBooks.some(
    (favoriteItem) => favoriteItem._id === bookItem._id
  );

  const dispatch = useDispatch();

  function handelFavoriteBookIcon(book: Book): void {
    dispatch(toggleThemeActions.currentTheme());
    if (!isFavorite) {
      dispatch(bookActions.addFavoriteBook(book));
      toast.success(`${book.title} has been added to favorite list`, {
        position: "top-left",
        progress: undefined,
        theme: currentTheme,
      });
    } else {
      dispatch(bookActions.removeFavoriteBook(book));
      toast.success(`${book.title} removed from favorite list`, {
        position: "top-left",
        progress: undefined,
        theme: currentTheme,
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
          <Link
            to={`/books/${bookItem._id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            {" "}
            <Img
              alt="complex"
              src={
                bookItem.images[
                  Math.floor(Math.random() * bookItem.images.length)
                ]
              }
              width={150}
              height={150}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="body2" color="text.secondary">
                ISBN: {bookItem.isbn}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                {bookItem.title}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                handelFavoriteBookIcon(bookItem);
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
