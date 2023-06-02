import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import { ReviewsList } from "./components/ReviewsList";
import { Review } from "./components/Review";
import { Home } from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviewsList" element={<ReviewsList />} />
          <Route path="/review/:review_id" element={<Review />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
