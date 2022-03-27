import React, { useState, useEffect } from "react";
import SwipeCard from "react-tinder-card";
import "./SwipeCards.css";

function SwipeCards() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // get random posts
    let posts = [
      {
        artistName: 'Wilfredo Lam', 
        imageUrl:'https://i.pinimg.com/564x/35/ef/e3/35efe36d12c21ff4ce85667dc282aeb9.jpg',
        description: 'Your Own Life',
        postHashHex: ''
      },
      {
        artistName: 'Rebecca Dru', 
        imageUrl:'https://live.staticflickr.com/3765/10959115764_a36a5e0e57_c.jpg',
        description: 'Tropic',
        postHashHex: ''
        
      },
      {
        artistName: 'Wilfredo Lam', 
        imageUrl:'https://i.pinimg.com/564x/35/ef/e3/35efe36d12c21ff4ce85667dc282aeb9.jpg',
        description: 'Your Own Life',
        postHashHex: ''
        
      },
      {
        artistName: 'Rebecca Dru', 
        imageUrl:'https://live.staticflickr.com/3765/10959115764_a36a5e0e57_c.jpg',
        description: 'Tropic',
        postHashHex: ''
      },
    ];

    setPosts(posts);
    
  }, []);

  return (
    <div>
      <div className="SwipeCards__cardContainer">
        {posts.map((post) => (
          <SwipeCard
            className="swipe"
            key={post.description}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${post.imageUrl})` }}
              className="card"
            >
              <h3>{post.description}</h3>
              <h5>By {post.artistName}</h5>
            </div>
          </SwipeCard>
        ))}
      </div>
    </div>
  );
}

export default SwipeCards;