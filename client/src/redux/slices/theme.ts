import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Theme = {
  theme: "light" | "dark";
  currentTheme: "light" | "dark";
};

export const initialState: Theme = {
  theme: "dark",
  currentTheme:"light"
};

const themeSlice = createSlice({
  name: "toggletheme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme === "light"
        ? (state.theme = "dark")
        
        : (state.theme = "light");

      //TODO:: add more themes for web
    },
    currentTheme: (state) => {
        state.theme === "light"
          ? (state.currentTheme = "dark")
          
          : (state.currentTheme = "light");
  
        //TODO:: add more themes for web
      },
  
  },
});

export const toggleThemeActions = themeSlice.actions;
const themeReducer = themeSlice.reducer;
export default themeReducer;
