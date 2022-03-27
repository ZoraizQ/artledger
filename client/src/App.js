import React, {useState} from "react";
import Header from "./Header";
import Profile from "./Profile";
import Login from "./Login";
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [userKey, setUserKey] = useState("");
  const [user, setUser] = useState({});
  const [type, setType] = useState("consumers");
  


  return (
      <Router>
        <Header loggedIn={loggedIn}/>
        <Routes>
          {
            loggedIn ?
            <Route index element={<Home />} /> :
            <Route index element={<Login setLoggedIn={setLoggedIn} setUserKey={setUserKey} setUser={setUser} setType={setType}/>} />
          }

          <Route path="/profile" element={<Profile userKey={userKey} user={user}/>} />
          <Route path="/artist/:username" element={<ArtistProfile />} />
        </Routes>
      </Router>
  );
}

export default App;
