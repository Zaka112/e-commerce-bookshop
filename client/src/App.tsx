import React from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import BookDetail from "./pages/BookDetail";
import Books from "./pages/Books";

function App() {
  return <div className="App"><HomePage/>
     <Routes>
     <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </div>;
}

export default App;
