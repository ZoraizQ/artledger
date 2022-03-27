import React from "react";
import "./SwipeButtons.css";

import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import DiamondIcon from '@mui/icons-material/Diamond';
import { ListItemText, Dialog, List, Avatar, ListItemAvatar, ListItem, DialogTitle } from "@mui/material";
import { lightGreen } from "@mui/material/colors";



const items = ['$0.01', '$0.5', '$5', '$10'];


function SimpleDialog({ onClose, selectedValue, open } ) {
  
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select tip amount</DialogTitle>
      <List sx={{ pt: 0 }}>
        {items.map((item) => (
          <ListItem button onClick={() => handleListItemClick(item)} key={item}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: lightGreen[50], color: "teal" }}>
                <DiamondIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}



function SwipeButtons({currentArtistKey}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(items[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div className="swipeButtons">
      <Link to={`/artist/${currentArtistKey}`} style={{ textDecoration: 'none', color: 'black', marginLeft: 10 }}>
        <IconButton className="swipeButtons__left" size="small">
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Link>
      <IconButton className="swipeButtons__right" size="small" onClick={handleClickOpen}>
        <DiamondIcon fontSize="large" />
      </IconButton>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
    
  );
};



export default SwipeButtons;