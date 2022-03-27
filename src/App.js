import React from "react";
import Header from "./Header";
import SwipeCards from "./SwipeCards";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SwipeButtons from "./SwipeButtons";


function Home() {
  return <div className="App">
    <Header />
    <SwipeCards />
    <SwipeButtons />
  </div>
}

function App() {
  return (
      <Router>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </Router>
  );
}

export default App;
