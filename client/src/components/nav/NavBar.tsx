import * as React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  SwipeableDrawer,
  Tooltip,
  Box,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  AppBar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { userActions } from "../../redux/slices/user";
import FavoriteList from "../favorite/FavoriteList";
import { RootState } from "../../redux/store";
import logo from "../../assets/logo.jpg";
import { toggleThemeActions } from "../../redux/slices/theme";

type Anchor = "right"; // slider
export default function NavBar() {
  const dispatch = useDispatch();

  // slider drawer for favorite
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
    };
  //-- end calling
  const themeMode = useSelector((state: RootState) => state.theme.theme);

  function toggleThemeHandler() {
    dispatch(toggleThemeActions.toggleTheme());
  }
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );
  let isLogin = useSelector((state: RootState) => state.user.isLogin);
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
        {isLogin ? "Sign Out" : "Sign In"}
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
      <MenuItem onClick={() => showProfile()}>Profile</MenuItem>
      <MenuItem onClick={() => shopHistory(userId)}>Shopping History</MenuItem>
      <MenuItem onClick={isLogin ? signOut : signIn}>
        {isLogin ? "Sign Out" : "Sign In"}
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
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton sx={{ ml: 1 }} color="inherit">
              <img src={logo} width={40} alt="" />
            </IconButton>
          </Link>
          <Tooltip title="Change Theme" arrow placement="right-start">
            <IconButton
              sx={{ ml: 1 }}
              onClick={() => toggleThemeHandler()}
              color="inherit"
            >
              {themeMode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>

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
    navigate(`/users/${userId}`);
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
    dispatch(userActions.removeUserData());
    navigate("/users/signin");
  }
}
