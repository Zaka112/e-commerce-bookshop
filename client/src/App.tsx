import React from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import BookDetails from "./components/books/BookDetails";

function App() {
  return <div className="App"><HomePage/>
     <Routes>
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </div>;
}

export default App;
