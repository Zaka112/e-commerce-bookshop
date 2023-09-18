import React from "react";

import { Badge, Box, IconButton, MenuItem, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

import NavFavorite from "./NavFavorite";
import { Diversity1 } from "@mui/icons-material";

export default function NavLinks() {
  const cartItems = useSelector((state: RootState) => state.cartList.cartItems);

  let cartItemsCount = cartItems.length;

  return (
    <div>
      <Box sx={{ display: { md: "flex" } }}>
        <Link to="/books" style={{ textDecoration: "none", color: "inherit" }}>
          <IconButton size="large" aria-label="Book List" color="inherit">
            <Tooltip title="Books" arrow>
              <InventoryIcon />
            </Tooltip>
          </IconButton>
        </Link>
        <NavFavorite />

        <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
          <IconButton
            size="large"
            aria-label={`show ${cartItemsCount} `}
            color="inherit"
          >
            <Badge badgeContent={cartItemsCount} color="error">
              <Tooltip title="Shoppingbag" arrow>
                <AddShoppingCartIcon />
              </Tooltip>
            </Badge>
          </IconButton>
        </Link>
      </Box>
    </div>
  );
}
