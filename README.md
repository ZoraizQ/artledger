# ArtLedger

## About the project
A blockchain based Tinder-like random art exploration responsive web app to discover and support lesser known artists.


## Features
* Login with your Deso Account to be a User (ensure you have an account on BitClout https://bitclout.com/)
* Sign Up as an Artist specifically with your Deso Bitclout Account (all your bitclout posts will be associated to ArtLedger)
* Swipe right to Like or Swipe left to skip a piece of art
* View the complete profile of the artist (likes, tips, posts) for the post is currently on display
* View your profile, owned DeSo coin value and liked art gallery
* Press the diamond button and select the tip level to tip the artist's post (Integration issues)


## How to run

1. Clone the repo
2. To run the client/frontend:
```
cd client
npm i
npm start
```
3. To run the server/backend:
```
cd server
pip3 install -r requirements.txt 
python3 server.py
```
Note: you may need to install dependencies like pycryptodome individually first on Linux/MacOS to prevent pyrebase clashes.

The server will start on localhost, port 5000.


### Dependencies used
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

### Code Sources used for help
* Directly used and modified DeSo Python Request Wrapper - https://github.com/AdityaChaudhary0005/DeSo.py
* React Tinder Clone basic guide - https://www.youtube.com/watch?v=DQfeB_FKKkc
