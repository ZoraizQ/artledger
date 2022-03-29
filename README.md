# ArtLedger

## About
A blockchain based Tinder-like random art exploration responsive web app to discover and support lesser known artists.

![artist](/assets/artist.png)


This web app is built on the DeSo blockchain, providing the complete social media interface with Tinder-like UI for swiping based randomized exploration to discover lesser known artists and consumers. Artists can upload their content and consumers interact with it. General users can swipe right to like, swipe left to ignore, and even tip to support the artist. Users can view their liked art and the profiles of Artists, and Artists can view their posts along with likes and tips. Submitted to HooHacks 2022.

![card2](/assets/card2.png)


## Creators
* Zoraiz Qureshi [@ZoraizQ](https://github.com/ZoraizQ) 
* Ethan Kacena-Merrell [@ethank-m](https://github.com/ethank-m)


## Features
* Login with your Deso Account to be a User (ensure you have an account on BitClout https://bitclout.com/)

![login](/assets/login.png)
* Sign Up as an Artist specifically with your Deso Bitclout Account (all your bitclout posts will be associated to ArtLedger)
* Swipe right to Like or Swipe left to skip a piece of art
* View the complete profile of the artist (likes, tips, posts) for the post is currently on display
* View your profile, owned DeSo coin value and liked art gallery
* Press the diamond button and select the tip level to tip the artist's post (Integration issues)

![tip](/assets/tip.png)

## What's next
* Preference-based model to optimize the randomized exploration for new art
* Provide the option to convert highly rated art pieces into NFTs
* Build a large userbase, UI/UX improvements
* More advanced tipping, CreatorCoin, Buy Coin, Buy NFT...
* AI-based verification of artists sign up
* Expand to other forms of art e.g. music, reels


## How to run

1. Clone the repo
2. To run the client/frontend:
```
npm i
npm start
```
3. To run the server/backend locally:
```
// Change server URL in src/api.js to http://127.0.0.1:5000
pip3 install -r requirements.txt 
python3 server/server.py
```
Note: you may need to install dependencies like pycryptodome individually first on Linux/MacOS to prevent pyrebase clashes.

The server will start on localhost, port 5000.


## Dependencies used
Client:
* reactjs
* react-router-dom
* material-ui (really cool library for icons and other ui needs!)
    * material-ui/icons
    * material-ui/code
* react-tinder-card

Server:
* python3
* flask
* deso (blockchain)
* pyrebase (Firebase wrapper for side information)

## Code sources used
* Directly used and modified DeSo Python Request Wrapper - https://github.com/AdityaChaudhary0005/DeSo.py
* React Tinder Clone basic guide - https://www.youtube.com/watch?v=DQfeB_FKKkc



