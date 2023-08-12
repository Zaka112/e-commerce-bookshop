import React from "react";

import {
  SwipeableDrawer,
  Tooltip,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import {  useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";

import FavoriteList from "../pages/favorite/FavoriteList";
import { RootState } from "../../redux/store";

type Anchor = "right"; // slider
export default function NavFavorite() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const favoriteItems = useSelector((state: RootState) => state.books.favorite);
  let favoriteItemsCount: number;
  favoriteItemsCount = favoriteItems.length;

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
      handleDrawerClose();
    };

  return (
    <div>
      <IconButton
        size="large"
        aria-label={`show ${favoriteItemsCount} new notifications`}
        color="inherit"
        onClick={toggleDrawer("right", true)}
      >
        <Badge badgeContent={favoriteItemsCount} color="error">
          <Tooltip title="Favorite" arrow>
            <FavoriteIcon />
          </Tooltip>
        </Badge>
      </IconButton>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        <Box
          sx={{ width: 400, minHeight: 600, textAlign: "center" }}
          role="presentation"
          onClick={toggleDrawer("right", false)}
          onKeyDown={toggleDrawer("right", false)}
        >
          {" "}
          <FavoriteList />
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
