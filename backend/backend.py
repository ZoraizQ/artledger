from random import random
from unittest import result
from Users import Users
from Post import Post
from Posts import Posts
from Trade import Trade
from Deso import Deso
import pprint
from flask import Flask
from flask import request
import pyrebase

config = {
  "apiKey": "AIzaSyBC8sBWUtc7fvPbPJ_3a2p51IH20RLJ-8Y",
  "authDomain": "desoart-172d0.firebaseapp.com",
  "projectId": "desoart-172d0",
  "storageBucket": "desoart-172d0.appspot.com",
  "messagingSenderId": "859512512594",
  "appId": "1:859512512594:web:46129010e5fa4650043f8b"
}
firebase = pyrebase.initialize_app(config)
db = firebase.database()

@app.route('/sign_up',methods=['POST'])
def sign_up(public_key,type):
    public_key = request.form["public_key"]
    type = request.form["type"]
    username = Users.getUsernameFromKey(public_key)
    data = {
        "username":username,
        "liked": list()
    }
    results = db.child(type).push(data,public_key) #type can only be consumers or artists

@app.route('/get_random_posts')
def get_random_posts():
    artists = list(db.child("artists").get().values())
    chosen = list()
    posts = list()
    for i in range(5):
        index = random.randint(0,len(artists))
        #chosen.append(artists[index])
        posts.append(Posts.getUserPosts(artists[index]))
    
    for i in posts:
        index = random.randint(0,len(i))
        chosen.append(i[index])

    return chosen

@app.route('/get_consumer_info/<public_key>')
def get_consumer_info(public_key):
    info = {}
    info["username"] = Users.getUsernameFromKey(public_key)
    info["profile_pic"] = Users.getProfilePic(public_key)
    return info

@app.route('/get_consumer_info/<public_key>')
def get_artists_info(public_key):
    info = {}
    info["username"] = Users.getUsernameFromKey(public_key)
    info["profile_pic"] = Users.getProfilePic(public_key)
    info["tips"] = Users.getWallet(public_key)["CloutInWalletNanos"]
    total = 0
    posts = Posts.getUserPosts(public_key)
    for i in posts:
        total += posts["LikeCount"]
    info["likes"] = total
    return info

@app.route('/get_posts/<public_key>')
def get_posts(public_key):
    return Posts.getUserPosts(public_key)

@app.route('/get_single_posts/<postHashHex>')
def get_single_post(postHashHex):
    return Posts.getPostInfo(postHashHex)


#like function
@app.route('/like_post',methods=['POST'])
def like_post(postHashHex,consumer_public_key):
    public_key = request.form["public_key"]
    postHashHex = request.form["postHasHex"]
    Post.like(postHashHex)
    db.child("consumers").update({"liked": list.append(postHashHex) },consumer_public_key)

#get consumers liked posts
@app.route('/get_liked_posts/<public_key>')
def get_liked_posts(public_key):
    posthash = db.child("consumers").get("liked",public_key)
    output = list()
    for i in posthash:
        output.append(get_single_post(i))
    return output

def upload_image(seed, public_key,path, contentin):
    post = Post(seedHex=seed,publicKey=public_key)
    imageFileList=[
    ('file',('screenshot.jpg',open(path, "rb"),'image/png'))
    ]
    url = post.uploadImage(imageFileList)
    post.send(content=contentin,imageUrl= url['ImageURL'])


app.run(debug=True)

