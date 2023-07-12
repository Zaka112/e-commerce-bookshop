import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Grid, Paper, Typography } from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { getBooksData } from "../../redux/thunk/books";
import BookItems from "./BookItems";


export default function BookList() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      dispatch(getBooksData());
    }, [dispatch]);
  
    const bookList = useSelector((state: RootState) => state.books.books);
    const isLoading = useSelector((state: RootState) => state.books.isLoading);
  
    if (isLoading) {
      return (
        <Paper>
          <CircularProgress />
        </Paper>
      );
    } else
      return (
        <Paper
          sx={{
            backgroundRepeat: "repeat",
            marginTop: 10,
          }}
        >
          <Typography variant="h3" component="h3">
            Available Books
          </Typography>
          <Grid
          container
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
          }}
        >
          {bookList.map((bookItem) => {
           return <BookItems key={bookItem._id} bookItem={bookItem}/>
          }
          )}
          </Grid>
        </Paper>
      );
}
