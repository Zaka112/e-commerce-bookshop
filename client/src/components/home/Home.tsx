import React, { useEffect } from "react";

import { Paper } from "@mui/material";

import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { getBooksData } from "../../redux/thunk/books";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBooksData());
  }, [dispatch]);

  const bookList = useSelector((state: RootState) => state.books.books);
  const mostSold = bookList.filter((bookItem) => bookItem.images.length === 3);
  return (
    //TODO: bring some nice layout in
    <Paper>
      {mostSold.map((Item) => {
        return <Paper>{Item.category}</Paper>;
      })}

      <Carousel showThumbs={false} showStatus={false} autoPlay>
        <Link to="/books">
          <Paper>
            <img
              alt="quotes"
              src="https://basmo.app/wp-content/uploads/2021/12/quotes-about-reading-books.webp"
            />
          </Paper>
        </Link>
        <Link to="/books">
          <Paper>
            <img
              alt="quotes"
              src="https://parade.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_700/MTkwNTgxMDM0NTM1MzY0NDc2/quotes-about-reading-books-5-1-jpg.webp"
            />
          </Paper>
        </Link>
        <Link to="/books">
          <Paper>
            <img
              alt="quotess"
              src="https://www.rd.com/wp-content/uploads/2021/05/books_quote1.jpg?resize=768,768"
            />
          </Paper>
        </Link>
      </Carousel>
    </Paper>
  );
}
