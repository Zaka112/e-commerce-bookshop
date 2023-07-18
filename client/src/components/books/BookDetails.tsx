import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CircularProgress, Paper, imageListClasses } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { getBookDetailData } from "../../redux/thunk/books";
import { v4 as uuidv4 } from "uuid";
import { Carousel } from "react-responsive-carousel";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();

  const bookDetails = useSelector((state: RootState) => state.bookDetail.book);
  const [currentImage, setCurrentImage] = useState("https://ca-times.brightspotcdn.com/dims4/default/3a7331d/2147483647/strip/true/crop/3000x2000+0+0/resize/2400x1600!/format/webp/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F04%2Fce%2F158fd30b42879d982b319483632f%2Fdigital-lede-illo.jpg");
  const isLoading = useSelector(
    (state: RootState) => state.bookDetail.isLoading
  );

  const dispatchApp = useDispatch<AppDispatch>();

  const bookDetailURL = `http://localhost:5001/books/${id}`;

  useEffect(() => {
    dispatchApp(getBookDetailData(bookDetailURL));
  }, [dispatchApp, bookDetailURL]);

  function changeImage(image: string) {
    setCurrentImage(image);
  }
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
        <Box
          key={bookDetails?._id}
          sx={{
            margin: 5,
            display: "flex",
          }}
        >
          <Card sx={{ minWidth: 600, minHeight: 600 }}>
            {/* <Carousel showThumbs={false} showStatus={false} autoPlay>
        <Link to="/productlist">
          <Paper>
          {bookDetails?.images
                  ? Object.entries(bookDetails.images).map((images) => {
                      return <Paper><img src={images[1]}   /></Paper>;
                    })
                  : "Not available"}
          </Paper>
        </Link>
        
        <Link to="/productlist">
          <Paper>
            <img
              alt="head fones"
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
            />
          </Paper>
        </Link>
       
      </Carousel> */}
            <CardMedia
              component="img"
              alt="Book Image"
              height={600}
              width={600}
              image={currentImage}
            />
          </Card>
          <Card sx={{ minWidth: 600, minHeight: 600 }}>
            {bookDetails?.images
              ? Object.entries(bookDetails.images).map((images) => {
                  const newImage = images[1];
                  return (
                    <img key={uuidv4()}
                      src={images[1]}
                      width={100}
                      height={100}
                      alt={bookDetails?.title}
                      onClick={() => changeImage(images[1])}
                    />
                  );
                })
              : <img src="https://ca-times.brightspotcdn.com/dims4/default/3a7331d/2147483647/strip/true/crop/3000x2000+0+0/resize/2400x1600!/format/webp/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F04%2Fce%2F158fd30b42879d982b319483632f%2Fdigital-lede-illo.jpg" alt="Default Image"/>}
            <Typography gutterBottom variant="h5" component="div">
              {bookDetails?.title}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              Price: {bookDetails?.price} $
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {bookDetails?.category}
            </Typography>

            <Link to="/books" style={{ color: "inherit" }}>
              <Button size="small" style={{ color: "inherit" }}>
                Back to shop
              </Button>
            </Link>
          </Card>
        </Box>
      </Paper>
    );
}
