import React, { useEffect } from "react";

import { Paper } from "@mui/material";
import { Col, Row } from "reactstrap";
import { Carousel } from "react-responsive-carousel";

import { getBooksData } from "../../redux/thunk/books";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBooksData());
  }, [dispatch]);

  const bookList = useSelector((state: RootState) => state.books.books);

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
