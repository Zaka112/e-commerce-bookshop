import React from "react";
import "./App.css";

import { useSelector } from "react-redux";
import { Paper, ThemeProvider, createTheme } from "@mui/material";

import AppRoutes from "./AppRoutes";
import Navbar from "./pages/Navbar";
import { RootState } from "./redux/store";
import Footer from "./components/footer/Footer";

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
