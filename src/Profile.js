import React, { useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import { Link } from "react-router-dom";
import { Avatar, Typography, makeStyles, Box } from "@mui/material";
import { get_liked_posts } from "./api";
import "./Profile.css";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


// const photos = [
//   {
//     src: 'https://i.pinimg.com/564x/35/ef/e3/35efe36d12c21ff4ce85667dc282aeb9.jpg',    
//     width: 4,
//     height: 3
//   },
//   {
//     src: 'https://live.staticflickr.com/3765/10959115764_a36a5e0e57_c.jpg',
//     width: 1,
//     height: 1
//   }
// ];



function Profile({userKey, user}) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    get_liked_posts(userKey).then(
      posts => {
        let posts_filtered = posts.map(post => ({ 
          description: post.PostFound.Body, 
          src: post.PostFound.ImageURLs[0], 
          id: post.PostFound.PostHashHex,
          artist_username: post.PostFound.ProfileEntryResponse.Username,
          artist_key: post.PostFound.ProfileEntryResponse.PublicKeyBase58Check,
          width: 1,
          height: 1
        }));
        setPhotos(posts_filtered);
      }
    )
  }, []);

  return (

    <div className="Profile" style={{marginTop: -20}}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
      }}>
        <div className="logo-header">
          <MonetizationOnIcon></MonetizationOnIcon>
          <h5 style={{fontSize: 20, fontFamily: "Courier New", fontWeight: 400}}>DeSo: {user.tips ? user.tips.toString().substring(0,6) : 0}</h5>
        </div>

        <Avatar
          src={user.profile_pic}
          alt="User avatar"
          sx={{ width: 84, height: 84 }}
        />
        <div to={`/${user.username}`} style={{ textDecoration: 'none', color: 'black', marginLeft: 10 }}>
          <Typography className="username" variant="h6">
            {user.username.substring(0, 10)}
          </Typography>
          <Typography fontSize={10} variant="h6">
            {userKey}
          </Typography>
        </div>
      </Box>

      <Typography style={{margin: 5, fontFamily: "Courier New", fontWeight: 600}}>Liked Art</Typography>
      <Gallery photos={photos} />
    </div>
  );
};



export default Profile;