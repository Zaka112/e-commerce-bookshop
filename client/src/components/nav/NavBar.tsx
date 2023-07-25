import * as React from "react";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar() {
  const userInformation = useSelector(
    (state: RootState) => state.users.userInformation
  );
  let isLogin = useSelector((state: RootState) => state.users.isLogin);
  let userId: string;
  if (userInformation) {
    userId = userInformation?._id;
  }
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const favoriteItems = useSelector((state: RootState) => state.books.favorite);
  const cartItems = useSelector((state: RootState) => state.cartList.cartItems);

  let favoriteItemsCount: number, cartItemsCount: number;
  favoriteItemsCount = favoriteItems.length;
  cartItemsCount = cartItems.length;

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => showProfile()}>Profile</MenuItem>
      <MenuItem onClick={() => shopHistory(userId)}>Shopping History</MenuItem>
      <MenuItem onClick={isLogin ? signOut : signIn}>
        {isLogin ? "SignOut" : "SignIn"}
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link
              to="/books"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton size="large" aria-label="Book List" color="inherit">
                <Tooltip title="Books" arrow>
                  <InventoryIcon />
                </Tooltip>
              </IconButton>
            </Link>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <IconButton
                size="large"
                aria-label={`show ${favoriteItemsCount} new notifications`}
                color="inherit"
              >
                <Badge badgeContent={favoriteItemsCount} color="error">
                  <Tooltip title="Favorite" arrow>
                    <FavoriteIcon />
                  </Tooltip>
                </Badge>
              </IconButton>
            </Link>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
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
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
  function showProfile(): void {
    navigate("/users/userinformation");
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function shopHistory(userId: string): void {
    navigate(`/orders/${userId}`);
    setAnchorEl(null);
    handleMobileMenuClose();
  }
  function signIn(): void {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/users/signin");
  }
  function signOut(): void {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setAnchorEl(null);
    handleMobileMenuClose();
    isLogin = false;
    navigate("/users/signin");
  }
}
