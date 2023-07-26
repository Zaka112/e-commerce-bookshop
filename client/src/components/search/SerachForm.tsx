import React, { useState } from "react";

import { Paper, TextField } from "@mui/material";
import { useDispatch } from "react-redux";

import { searchActions } from "../../redux/slices/search";

export default function SearchForm() {
  const [userInput, setUserInput] = useState("");

  const dispatch = useDispatch();
  function findBooks(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const trimSpaces = value.trim();
    setUserInput(trimSpaces);
    dispatch(searchActions.searchBooks(userInput));
  }
  return (
    <Paper>
      <form>
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          helperText="Search books"
          onChange={findBooks}
        />
      </form>
    </Paper>
  );
}
