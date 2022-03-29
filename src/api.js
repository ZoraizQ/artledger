import fetch from 'node-fetch'
//const fetch = require("node-fetch")
//export make function opposites in js

// fetch local host
const URL  = "http://127.0.0.1:5000"

export async function sign_up(public_key,type){
    const param = {key:public_key, type: type};
    const response = await fetch(URL + '/sign_up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(param)
    });
    console.log(response);
    const data = await response.json();
    return data
}
// sign_up('BC1YLiyxrKs33n3mwPDaT2h7rNigZNSxTAAe1SY9SVkoeQA2h5A7b3p',"consumers")

export async function get_random_posts(){
    const response = await fetch(URL + '/get_random_posts')
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
}
get_random_posts();

export async function get_consumer_info(public_key){
    const response = await fetch(URL + '/get_consumer_info/' + public_key)
    //console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
}
get_consumer_info('BC1YLiyxrKs33n3mwPDaT2h7rNigZNSxTAAe1SY9SVkoeQA2h5A7b3p');

export async function get_artists_info(public_key){
    const param = {key:public_key};
    const response = await fetch(URL + '/get_artists_info' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(param)
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
}
//get_artists_info('BC1YLiyxrKs33n3mwPDaT2h7rNigZNSxTAAe1SY9SVkoeQA2h5A7b3p','zoraizq');

export async function get_posts(username){
    const response = await fetch(URL + '/get_posts/' + username)
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
}
//get_posts('zoraizq');


export async function get_single_post(postHashHex){
    const response = await fetch(URL + '/get_single_post/' + postHashHex)
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
}
//get_single_post('affab325bf298937c9111955f1c6605d02465a138d620ea8642bc4882e0021db');

export async function like_post(postHashHex, public_key, seedHex){
    const param = {postHashHex: postHashHex, public_key:public_key, seedHex:seedHex};
    const response = await fetch(URL + '/like_post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(param)
    });
    // console.log(response);
    const data = await response.json();
    return data;
}
// like_post('affab325bf298937c9111955f1c6605d02465a138d620ea8642bc4882e0021db','BC1YLiyxrKs33n3mwPDaT2h7rNigZNSxTAAe1SY9SVkoeQA2h5A7b3p','a1c2941bf195fb6d6d4771ccb0d95d8adf1099b83de95ec6ac22c990bc528051');


export async function get_liked_posts(public_key){
    const response = await fetch(URL + '/get_liked_posts/' + public_key)
    console.log(response);
    const data = await response.json();
    // console.log(data.posts);
    return data.posts;
}
// get_liked_posts('BC1YLiyxrKs33n3mwPDaT2h7rNigZNSxTAAe1SY9SVkoeQA2h5A7b3p');



 

