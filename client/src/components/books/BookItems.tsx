import React from "react";

import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";

import { Book } from "../../types/types";
type Prop = {
  bookItem: Book;
};
export default function BookItems({ bookItem }: Prop) {
  return (
    <Paper>
      <Card sx={{ maxWidth: 300, minHeight: 320 }}>
        <Link
          to={`/books/${bookItem._id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          {" "}
          <CardMedia
            component="img"
            alt={bookItem.title}
            height="140"
            image={bookItem.images[0]}
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {bookItem.title}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Price: {bookItem.price} $
          </Typography>
          <Link to={`/books/${bookItem._id}`} style={{ color: "inherit" }}>
            {" "}
            <Button size="small" sx={{ color: "inherit" }}>
              Learn More
            </Button>
          </Link>
          ||
          <Button size="small" style={{ color: "inherit" }}>
            Add to cart
          </Button>
        </CardContent>

        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </Card>
    </Paper>
  );
}
