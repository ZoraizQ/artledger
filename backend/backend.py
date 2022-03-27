from random import random
from unittest import result
from Users import Users
from Post import Post
from Posts import Posts
from Trade import Trade
from Deso import Deso
import pprint
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
def sign_up(public_key,type):
    username = Users.getUsernameFromKey(public_key)
    data = {
        "username":username
    }
    results = db.child(type).push(data,public_key) #type can only be consumers or artists

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


def get_posts(public_key):
    return Posts.getUserPosts(public_key)




pp = pprint.PrettyPrinter(width=41, compact=True)
id = "BC1YLiyxrKs33n3mwPDaT2h7rNigZNSxTAAe1SY9SVkoeQA2h5A7b3p"
seed = "a1c2941bf195fb6d6d4771ccb0d95d8adf1099b83de95ec6ac22c990bc528051"


deso = Deso(id)
post = Post(seedHex=seed,publicKey=id)
imageFileList=[
  ('file',('screenshot.jpg',open("answer 4.png", "rb"),'image/png'))
]
url = post.uploadImage(imageFileList)
post.send(content="This is my first post",imageUrl= url['ImageURL'])

#listOfPublicKeys = [id] # you can pass multiple public key of users
#pp.pprint(Users.getUserStateless(listOfPublicKeys))
#pp.pprint(deso.getDeSoPrice())