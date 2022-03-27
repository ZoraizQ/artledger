import React, { useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import { Link } from "react-router-dom";
import { Avatar, Typography, makeStyles, Box } from "@mui/material";
// import "./Profile.css";


const photos = [
  {
    src: 'https://i.pinimg.com/564x/35/ef/e3/35efe36d12c21ff4ce85667dc282aeb9.jpg',    
    width: 4,
    height: 3
  },
  {
    src: 'https://live.staticflickr.com/3765/10959115764_a36a5e0e57_c.jpg',
    width: 1,
    height: 1
  }
];



function Profile() {

  const [user, setUser] = useState([]);

  useEffect(() => {
    let userInfo = {
      username: 'Zoraiz Qureshi', 
      photoUrl:'https://zoraizq.github.io/static/media/profile.88c2ba019505adaef67a.jpg',
    };

    setUser(userInfo);
    
  }, []);

  return (

    
    <div className="Profile" style={{marginTop: -20}}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
      }}>
        <Avatar
          src={user.photoUrl}
          alt="User avatar"
          sx={{ width: 84, height: 84 }}
        />
        <div to={`/${user.username}`} style={{ textDecoration: 'none', color: 'black', marginLeft: 10 }}>
          <Typography variant="h6">
            {user.username}
          </Typography>
        </div>
      </Box>

      <h5 style={{margin: 5}}>Liked Art</h5>
      <Gallery photos={photos} />
    </div>
  );
};



export default Profile;