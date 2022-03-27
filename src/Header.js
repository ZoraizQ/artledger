import React from "react";
import "./Header.css";
import PersonIcon from "@mui/icons-material/Person";
import ForumIcon from "@mui/icons-material/Forum";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";

function Header({ backButton }) {
  const history = useNavigate();
  return (
    <div className="header">
      {backButton ? (
        <IconButton onClick={() => history.replace(backButton)}>
          <ArrowBackIosIcon className="header__icon" fontSize="large" />
        </IconButton>
      ) : (
        <IconButton>
          <PersonIcon className="header__icon" fontSize="large" />
        </IconButton>
      )}
      <Link to="/">
        <img
          className="header__logo"
          src="https://www.graphicsprings.com/filestorage/stencils/1f4e948fcfc9977ee6fb567bd815132d.png?width=500&height=500"
          alt="logo"
        />
      </Link>
      {/* <Link to="/chat">
        <IconButton>
          <ForumIcon className="header__icon" fontSize="large" />
        </IconButton>
      </Link> */}
    </div>
  );
}

export default Header;
