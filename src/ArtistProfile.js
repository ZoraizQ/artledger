import React, { useState, useEffect, useCallback } from "react";
import Gallery from "react-photo-gallery";
import { useParams } from "react-router-dom";
import { Avatar, Typography, makeStyles, Box, Icon } from "@mui/material";
// import "./Profile.css";
import Carousel, { Modal, ModalGateway } from "react-images";
import { get_artists_info, get_posts } from "./api";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiamondIcon from '@mui/icons-material/Diamond';



const morePhotos = [
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
  const [artistKey, setArtistKey] = useState(useParams().key);
  const [artist, setArtist] = useState({});
  const [photos, setPhotos] = useState([]);

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);


  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };


  useEffect(() => {
    console.log('artistKey', artistKey);  
    if (artistKey !== undefined) {
      get_artists_info(artistKey).then(info => {
        console.log('artist info ', info);
        info.diamonds = 0;
        setArtist(info);
      })
    }
    

    get_posts(artistKey).then(
      posts => {
        console.log('artistposts',posts);
        let posts_filtered = posts.Posts.map(p => {
          let post = { 
            description: p.Body, 
            id: p.PostHashHex,
            // artist_username: post.ProfileEntryResponse != null ? post.ProfileEntryResponse.Username : '',
            artist_key: p.PosterPublicKeyBase58Check,
            width: 1,
            height: 1
          }
          

          if (p.ImageURLs !== null && p.ImageURLs !== undefined && p.ImageURLs.length !== 0) {
            post.src = p.ImageURLs[0]; 
          }
          else {
            post.src = "";
          }
          
          return post;

        });
        console.log('photos', posts_filtered);
        
        setPhotos(posts_filtered);
      }
    )

  }, [artistKey]);

  return (

    
    <div className="ArtistProfile" style={{marginTop: -20}}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
      }}>
        <div className="logo-header">
          <FavoriteIcon></FavoriteIcon>
          <h5 style={{fontSize: 20, fontFamily: "Courier New", fontWeight: 400}}>{artist.likes}</h5>
        </div>
      
        <div className="logo-header">
          <DiamondIcon></DiamondIcon>
          <h5 style={{fontSize: 20, fontFamily: "Courier New", fontWeight: 400}}>{artist.diamonds}</h5>
        </div>

        &nbsp;&nbsp;&nbsp;
      
        <Avatar
          src={artist.profile_pic}
          alt="User avatar"
          sx={{ width: 84, height: 84 }}
        />
        <div to={`/${artist.username}`} style={{ textDecoration: 'none', color: 'black', marginLeft: 10 }}>
          {
            artist.username &&
            <Typography className="username" variant="h6">
              {artist.username.substring(0, 10)}
            </Typography>
          }
          <Typography fontSize={10} variant="h6">
            {artist.username}
          </Typography>
         
        </div>
      </Box>

      <Typography style={{margin: 5, fontFamily: 'Courier New', fontWeight: 600}}>My Art</Typography>
      <Gallery photos={photos} onClick={openLightbox} />

      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(p => ({
                ...p,
                srcset: p.srcset,
                caption: p.description
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};



export default ArtistProfile;