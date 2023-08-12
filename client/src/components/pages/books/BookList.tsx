import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import { AppDispatch, RootState } from "../../../redux/store";
import { getBookList } from "../../../redux/thunk/books";
import BookItems from "./BookItems";
import SearchForm from "../../search/SerachForm";

export default function BookList() {
  const [progress, setProgress] = React.useState(10);
  const dispatch = useDispatch<AppDispatch>();
  const bookList = useSelector((state: RootState) => state.books.books);
  const isLoading = useSelector((state: RootState) => state.books.isLoading);
  const searchedString = useSelector(
    (state: RootState) => state.search.searchedString
  );

  const searchedBook = bookList.filter((book) =>
    book.title.toLowerCase().includes(searchedString.toLowerCase())
  );

  useEffect(() => {
    dispatch(getBookList());
  }, [dispatch]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 100 ? 0 : prevProgress + 10
  //     );
  //   }, 600);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Paper sx={{ minHeight: 600 }}>
        {/* <CircularProgress size="10rem" color="inherit" /> */}
        <CircularProgressWithLabel size="10rem" value={progress} />
      </Paper>
    );
  } else
    return (
      <Paper>
        <Typography variant="h3" component="h3">
          BuY !T
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
