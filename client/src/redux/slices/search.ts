import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  searchedString: string;
  searchBy: "author"| "title" | "reset" ;
};
const initialState: InitialState = {
  searchedString: "",
  searchBy: "title"
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
  
    searchBooks: (state, action: PayloadAction<string>) => {
        state.searchBy= "title"
        state.searchedString = action.payload;
      
    },
    searchByAuthor: (state, action: PayloadAction<string>) => {
        state.searchBy= "author"
        state.searchedString = action.payload;
      
    },
  },
});
export const searchActions = searchSlice.actions;
const searchReducer = searchSlice.reducer;
export default searchReducer;
