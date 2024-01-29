import React from "react";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { Paper, ThemeProvider, createTheme } from "@mui/material";

import AppRoutes from "AppRoutes";
import Navbar from "pages/Navbar";
import { RootState } from "redux/store";
import Footer from "components/footer/Footer";
import { userActions } from "redux/slices/user";

function App() {
  const themeMode = useSelector((state: RootState) => state.theme.theme);
  const theme = createTheme({
    typography: {
      fontFamily: ["Nunito", "sen-serif"].join(","),
    },
    palette: {
      mode: themeMode === "dark" ? "light" : "dark",
    },
  });

  const dispatch = useDispatch();
  dispatch(userActions.checkTimeStamp());

  return (
    <ThemeProvider theme={theme}>
      <Paper className="App">
        <Navbar />
        <AppRoutes />
      </Paper>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
