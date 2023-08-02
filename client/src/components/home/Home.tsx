import React, { useEffect } from "react";

import { CircularProgress, Paper } from "@mui/material";
import { Col, Row } from "reactstrap";
import { Carousel } from "react-responsive-carousel";

import { getBookList } from "../../redux/thunk/books";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBookList());
  }, [dispatch]);

  const bookList = useSelector((state: RootState) => state.books.books);
  const isLoading = useSelector((state: RootState) => state.books.isLoading);

  if (isLoading) {
    return (
      <Paper >
        <CircularProgress size="15rem" color="inherit" />
      </Paper>
    );
  } else
  return (
    <Paper>
      <Row>
        <Col md="6">
          <Carousel
            showThumbs={false}
            showStatus={false}
            dynamicHeight
            autoPlay={true}
                      >
            {bookList.map((item) => {
              return (
                <img
                key={item._id}
                  alt={item.title}
                  src={
                    item.images[Math.floor(Math.random() * item.images.length)]
                  }
                />
              );
            })}
          </Carousel>
        </Col>
      </Row>
    </Paper>
  );
}
