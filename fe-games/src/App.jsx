import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav'
import {ReviewsList} from './components/ReviewsList'

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <>
        <Nav/>
        <Routes>
          <Route path="/reviewsList" element={<ReviewsList />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
