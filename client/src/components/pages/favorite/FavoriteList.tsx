import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Book } from "../../../types/types";
import { bookActions } from "../../../redux/slices/books";
import {
  CardMedia,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import wishListImage from "../../../assets/heartbook.png";

export default function FavoriteList() {
  const favoriteBooks = useSelector((state: RootState) => state.books.favorite);

  const dispatch = useDispatch();

  function removeFavorite(favBook: Book): void {
    dispatch(bookActions.removeFavoriteBook(favBook));
  }

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Paper
            sx={{
              marginTop: 8,
              height: 600,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ backgroundColor: "inherit" }}
            >
              Wish List
            </Typography>
            {favoriteBooks.length === 0 ? (
              <Box component="div" sx={{ maxWidth: 380, margin: 1 }}>
                <CardMedia
                  component="img"
                  height="500px"
                  image={wishListImage}
                  alt="favorite"
                />

                <Typography variant="h5" component="div">
                  Empty?
                </Typography>
                <Tooltip title="Go To Shop" arrow placement="right">
                  <Link to="/books">
                    <Button variant="contained" size="small">
                      Bring some in!
                    </Button>{" "}
                  </Link>
                </Tooltip>
              </Box>
            ) : (
              favoriteBooks.map((favItem) => {
                return (
                  <Box
                    margin={1}
                    key={favItem._id}
                    sx={{
                      display: "flex",
                      gap: "2rem",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Tooltip title="Book Details" arrow placement="left">
                      <Link to={`/books/${favItem._id}`}>
                        <img
                          src={favItem.images[0]}
                          width={70}
                          alt={favItem.title}
                        />
                      </Link>
                    </Tooltip>
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Typography>{favItem.title}</Typography>
                      <Typography>Price: ${favItem.price}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",

                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => removeFavorite(favItem)}
                        sx={{ color: "red" }}
                      >
                        <Tooltip title="Delete" arrow>
                          <DeleteForeverIcon />
                        </Tooltip>
                      </IconButton>
                    </Box>
                  </Box>
                );
              })
            )}
          </Paper>
        </React.Fragment>
      ))}
    </div>
  );
}
