import React from "react";
import "./SwipeButtons.css";
import MonetizationIcon from "@mui/icons-material/Replay";
import AccountCircleIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";

const SwipeButtons = () => {
  return (
    <div className="swipeButtons">
      <IconButton className="swipeButtons__star">
        <AccountCircleIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__right">
        <MonetizationIcon fontSize="large" />
      </IconButton>
    </div>
  );
};



export default SwipeButtons;