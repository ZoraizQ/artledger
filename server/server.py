from queue import Empty
from random import random, shuffle
from desopip.Users import Users
from desopip.Post import Post
from desopip.Posts import Posts
from desopip.Trade import Trade
from desopip.Deso import Deso
from flask import Flask
from flask_cors import CORS
from flask import request, jsonify
app = Flask(__name__)
CORS(app)
import pyrebase
import math

# update config to connect to firebase app for cloudstore
config = {
  "apiKey": "",
  "authDomain": "",
  "projectId": "",
  "storageBucket": "",
  "messagingSenderId": "",
  "appId": "",
  "databaseURL": "",
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

@app.route('/sign_up',methods=['POST'])
def sign_up():
    r = request.get_json()
    public_key = r["key"]
    type = r["type"]
    username = Users.getUsernameFromKey(public_key)

    data = {
        "username":username,
        "liked": list()
    }
    print(data, public_key)
    results = db.child(type).child(public_key).set(data) #type can only be consumers or artists

@app.route('/get_random_posts')
def get_random_posts():
    artists = db.child("artists").get().val()

    chosen = list()
    for public_key, _ in artists.items():
        posts = Posts.getUserPosts(publicKey=public_key)
        chosen += posts['Posts']

    shuffle(chosen)
    return {'posts': chosen}

@app.route('/get_consumer_info/<public_key>')
def get_consumer_info(public_key):
    info = {}
    info["username"] = Users.getUsernameFromKey(public_key)
    info["profile_pic"] = Users.getProfilePic(public_key)
    info["tips"] = Users.getWallet(public_key)["CloutInWalletNanos"] * math.pow(10,-9)

    return info



@app.route('/get_artists_info',methods=['POST'])
def get_artists_info():
    r = request.get_json()
    public_key = r["key"]
    info = {}
    info["username"] = Users.getUsernameFromKey(public_key)
    info["profile_pic"] = Users.getProfilePic(public_key)
    info["tips"] = Users.getWallet(public_key)["CloutInWalletNanos"] * math.pow(10,-9)
    total = 0
    posts = Posts.getUserPosts(publicKey=public_key)
    posts = posts["Posts"]
    for i in posts:
        total += int(i["LikeCount"])
    info["likes"] = total
    return info



@app.route('/get_posts/<username>')
def get_posts(username):
    return Posts.getUserPosts(publicKey=username)

@app.route('/get_single_post/<postHashHex>')
def get_single_post(postHashHex):
    return Posts.getPostInfo(postHashHex)


#like function
@app.route('/like_post',methods=['POST'])
def like_post():
    r = request.get_json()
    public_key = r["public_key"]
    postHashHex = r["postHashHex"]
    seedHex = r["seedHex"]
    print(public_key, postHashHex, seedHex)
    post = Post(seedHex = seedHex, publicKey= public_key)
    post.like(postHashHex= postHashHex)
    username = Users.getUsernameFromKey(public_key)
    list_attr = db.child("consumers").child(public_key).get().val()
    liked_arr = []

    for attr, value in list_attr.items():
        if attr == 'liked':
            liked_arr = value
            break

    db.child("consumers").child(public_key).set({"username": username, "liked": 
    liked_arr + [postHashHex]})
    return {}


#get consumers liked posts
@app.route('/get_liked_posts/<public_key>')
def get_liked_posts(public_key):
    posthash_od = db.child("consumers").child(public_key).get().val()
    print(posthash_od)
    output = list()
    for attr, value in posthash_od.items():
        if attr == 'liked':
            posthash_list = value
            for i in posthash_list:
                output.append(get_single_post(i))
    return {'posts':output}

# def upload_image(seed, public_key,path, contentin):
#     post = Post(seedHex=seed,publicKey=public_key)
#     imageFileList=[
#     ('file',('screenshot.jpg',open(path, "rb"),'image/png'))
#     ]
#     url = post.uploadImage(imageFileList)
#     post.send(content=contentin,imageUrl= url['ImageURL'])


app.run(debug=True)

