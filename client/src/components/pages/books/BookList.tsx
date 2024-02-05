import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Grid, Pagination, Paper, Typography } from "@mui/material";

import { AppDispatch, RootState } from "redux/store";
import { getBookList } from "redux/thunk/books";
import BookItems from "./BookItems";
import SearchForm from "../../search/SerachForm";
import SortForm from "../../sort/SortForm";
import Loading from "components/misc/Loading";

export default function BookList() {
  // const [progress, setProgress] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const bookList = useSelector((state: RootState) => state.books.books);
  //filter on sale
  //const onSale= bookList.filter((books)=> books.onSale)
  const itemsPerPage = 5;
  const totalPages = Math.ceil(bookList.length / itemsPerPage);
  let isLoading = useSelector((state: RootState) => state.books.isLoading);
  const searchedString = useSelector(
    (state: RootState) => state.search.searchedString
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const booksPerPage = bookList.slice(startIndex, endIndex);

  const searchedBook = booksPerPage.filter((book) =>
    book.title.toLowerCase().includes(searchedString.toLowerCase())
  );

  useEffect(() => {
    dispatch(getBookList());
  }, [dispatch]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <Paper sx={{ minHeight: 600 }}>
        <Loading />
      </Paper>
    );
  } else
    return (
      <Paper>
        <Typography variant="h3" component="h3">
          Book Shop
        </Typography>
        <SearchForm />
        <SortForm />

        <Grid
          container
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          }}
        >
          {searchedBook.map((bookItem) => {
            return <BookItems key={bookItem._id} bookItem={bookItem} />;
          })}
        </Grid>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Paper>
    );
}
