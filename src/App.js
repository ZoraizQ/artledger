import React from "react";
import Header from "./Header";
import Profile from "./Profile";
import ArtistProfile from "./ArtistProfile";
import SwipeCards from "./SwipeCards";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SwipeButtons from "./SwipeButtons";


function Home() {
  return <div className="App">
    <SwipeCards />
    <SwipeButtons />
  </div>
}

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/artist/:username" element={<ArtistProfile />} />
        </Routes>
      </Router>
  );
}

export default App;
