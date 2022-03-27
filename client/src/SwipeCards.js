import React, { useState, useEffect } from "react";
import SwipeCard from "react-tinder-card";
import "./SwipeCards.css";
import { get_random_posts, like_post } from "./api";


function SwipeCards({seedHex, userKey, setCurrentArtistKey}) {
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);

  const [lastDirection, setLastDirection] = useState("");

  
  const swiped = (direction, postHashHex) => {
    console.log('removing: ' + postHashHex + ' from artist ' + posts[index].artist_key)
    setLastDirection(direction)
    if (direction == "right") {
      // like post
      console.log("passing in", postHashHex, userKey, seedHex);

      like_post(postHashHex, userKey, seedHex).then(res => console.log(res));

    }

    setCurrentArtistKey(posts[index].artist_key);
    setIndex(index + 1);

  }
  

  useEffect(() => {
   
    get_random_posts().then(
      posts => {
        console.log('posts',posts);
        let posts_filtered = posts.posts.map(p => {
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
          
          return post;

        });
        console.log('photos', posts_filtered);
        setPosts(posts_filtered);
        setCurrentArtistKey(posts_filtered[0].artist_key);
      }
    )
    setPosts(posts);
    
  }, []);

  return (
    <div>
      <div className="SwipeCards__cardContainer">
        {posts.map((post) => (
          <SwipeCard
            className="swipe"
            key={post.id}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, post.id)}
          >
            <div
              style={{ backgroundImage: `url(${post.src})` }}
              className="card"
            >
              <h3>{post.description}</h3>
              <h5>By {post.artist_key.substring(0, 10)}</h5>
            </div>
          </SwipeCard>
        ))}
      </div>
      {lastDirection ? <h2 className='infoText'>
        {lastDirection != "" && lastDirection == "right" ? <div style={{color:"teal"}}>Liked</div> : <div style={{color:"darkgrey"}}>Nope</div>}</h2> : <h2 className='infoText' />}
    </div>
  );
}

export default SwipeCards;
