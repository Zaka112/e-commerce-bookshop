import React, { useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { getBookDetailData } from "../../redux/thunk/books";

export default function BookDetails() {

   const { id } = useParams<{ id: string }>();

  const bookDetail = useSelector(
    (state: RootState) => state.bookDetail.book
  );
  console.log(bookDetail)
  const isLoading = useSelector(
    (state: RootState) => state.bookDetail.isLoading
  );

  const dispatchApp = useDispatch<AppDispatch>();

  const bookDetailURL = `http://localhost:5001/books/${id}`;

  useEffect(() => {
    dispatchApp(getBookDetailData(bookDetailURL));
  }, [dispatchApp, bookDetailURL]);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else
    return (
      <Paper
        sx={{
          display: "flex",
          marginTop: 5,
          justifyContent: "center",
        }}
      >
        {bookDetail?.map((bookDetail) => (
          <Box
            key={bookDetail?._id}
            sx={{
              margin: 5,
            }}
          >
            <Card sx={{ maxWidth: 300, minHeight: 320 }}>
              <CardMedia
                component="img"
                alt="Product Card"
                height="140"
                image={bookDetail?.images[1]}
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {bookDetail?.title}
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  Price: {bookDetail?.price} $
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {bookDetail?.title} belongs to {bookDetail?.title}{" "}
                  category.
                </Typography>

                <Link to="/products" style={{ color: "inherit" }}>
                  <Button size="small" style={{ color: "inherit" }}>
                    Back to shop
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Paper>
    );
}
