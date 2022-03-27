import React, { useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import { useParams } from "react-router-dom";
import { Avatar, Typography, makeStyles, Box } from "@mui/material";
// import "./Profile.css";


const photos = [
  {
    src: 'https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg',    
    width: 4,
    height: 3
  },
  {
    src: 'https://images.unsplash.com/photo-1617503752587-97d2103a96ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0d29ya3xlbnwwfHwwfHw%3D&w=1000&q=80',
    width: 1,
    height: 1
  }
];



function ArtistProfile() {
  let { username } = useParams();
  
  const [user, setUser] = useState([]);

  useEffect(() => {  
    let userInfo = {
      username: username, 
      photoUrl:'https://i.pravatar.cc/150?u=fake@pravatar.com',
    };

    setUser(userInfo);
    
  }, []);

  return (

    
    <div className="ArtistProfile" style={{marginTop: -20}}>
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

      <h5 style={{margin: 5}}>My Art</h5>
      <Gallery photos={photos} />
    </div>
  );
};



export default ArtistProfile;