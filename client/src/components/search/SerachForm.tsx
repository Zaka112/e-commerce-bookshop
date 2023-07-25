import React, { useState } from "react";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { searchActions } from "../../redux/slices/search";
import { bookActions } from "../../redux/slices/books";

export default function SearchForm() {
  const [userInput, setUserInput] = useState("");
  const [searchBy, setSearchBy] = useState("");

  function handleChange(event: SelectChangeEvent) {
    setSearchBy(event.target.value);
    if (searchBy === "author") {
      dispatch(searchActions.searchByAuthor(event.target.value));
    }
    if (searchBy === "title") {
      dispatch(searchActions.searchBooks(event.target.value));
    }
  }
  const dispatch = useDispatch();
  function findBooks(event: React.ChangeEvent<HTMLInputElement>) {
    //  const value = event.target.value;
    // const trimSpaces = value.trim();

    setUserInput(event.target.value);
    dispatch(searchActions.searchBooks(userInput));
  }
  return (
    <Paper>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-helper-label">Search by</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={searchBy}
          label="Search"
          onChange={handleChange}
        >
          <MenuItem value={"reset"}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"author"}>Author</MenuItem>
          <MenuItem value={"title"}>Title</MenuItem>
        </Select>
        <FormHelperText>Search by</FormHelperText>
      </FormControl>

      <form>
        <div>{searchBy}</div>
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
