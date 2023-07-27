import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Grid, Paper, Typography } from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { getBooksData } from "../../redux/thunk/books";
import BookItems from "./BookItems";
import SearchForm from "../search/SerachForm";

export default function BookList() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBooksData());
  }, [dispatch]);

  const bookList = useSelector((state: RootState) => state.books.books);
  const isLoading = useSelector((state: RootState) => state.books.isLoading);
  const searchedString = useSelector(
    (state: RootState) => state.search.searchedString
  );

  const searchedBook = bookList.filter((book) =>
    book.title.toLowerCase().includes(searchedString.toLowerCase())
  );
  if (isLoading) {
    return (
      <Paper sx={{minHeight:600}}>
        <CircularProgress size="10rem" color="inherit"  />
      </Paper>
    );
  } else
    return (
      <Paper>
        <Typography variant="h3" component="h3">
          Books
        </Typography>
        <SearchForm />
        <Grid
          container
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          {searchedBook.map((bookItem) => {
            return <BookItems key={bookItem._id} bookItem={bookItem} />;
          })}
        </Grid>
      </Paper>
    );
}
