import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Book } from "../../types/types";
import { bookActions } from "../../redux/slices/books";
import { IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
              backgroundImage: `url(https://images.unsplash.com/photo-1542948338-ded3dbb75080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)`,
            }}
          >
            <Typography variant="h4" component="h1">
              Wish List
            </Typography>
            {favoriteBooks.length === 0 ? (
              <Typography variant="h4" component="div">
                List of Favorite Choices is empty.
                <Tooltip title="Go To Shop" arrow placement="right">
                  <Link to="/books">
                    <Button>Bring some in!</Button>{" "}
                  </Link>
                </Tooltip>
              </Typography>
            ) : (
              favoriteBooks.map((favItem) => {
                return (
                  <Box
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
                      <Typography>
                        {favItem.title}: ${favItem.price}
                      </Typography>
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
