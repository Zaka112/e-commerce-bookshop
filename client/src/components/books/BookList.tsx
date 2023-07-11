import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Paper, Typography } from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { getBooksData } from "../../redux/thunk/books";


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
            List of books
          </Typography>
  
          {bookList.map((book) => (
            <div key={book._id}>
              <a href={`/books/${book._id}`}>
                {book.title}
              </a>
            </div>
          ))}
        </Paper>
      );
}
