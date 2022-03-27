import React from "react";
import "./SwipeButtons.css";

import { Link } from "react-router-dom";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";

function SwipeButtons({username="artist"}) {
  // current username of artist

  return (
    <div className="swipeButtons">
      <Link to={`/artist/${username}`} style={{ textDecoration: 'none', color: 'black', marginLeft: 10 }}>
        <IconButton className="swipeButtons__star" size="small">
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Link>
      <IconButton className="swipeButtons__right" size="small">
        <MonetizationOnIcon fontSize="large" />
      </IconButton>
    </div>
  );
};



export default SwipeButtons;