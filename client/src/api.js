//make function opposites in js

// fetch local host
const URL  = "http://localhost"

export function sign_up(public_key,type){
    const param = {key:public_key, userType: type};
    const response = await fetch(URL + '/sign_up/', {
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

export function get_random_posts(){
    const response = await fetch(URL + '/get_random_posts/')
    console.log(response);
    const data = await response.json;
    console.log(data);
    return data;
}


export function get_consumer_info(public_key){
    const response = await fetch(URL + '/get_consumer_info/' + public_key)
    console.log(response);
    const data = await response.json;
    console.log(data);
    return data;
}
get_consumer_info(BC1YLiyxrKs33n3mwPDaT2h7rNigZNSxTAAe1SY9SVkoeQA2h5A7b3p)

export function get_artists_info(public_key){
    const response = await fetch(URL + '/get_artists_info/' + public_key)
    console.log(response);
    const data = await response.json;
    console.log(data);
    return data;
}

export function get_posts(public_key){
    const response = await fetch(URL + '/get_posts/' + public_key)
    console.log(response);
    const data = await response.json;
    console.log(data);
    return data;
}

export function get_single_post(postHashHex){
    const response = await fetch(URL + '/get_single_post/' + postHashHex)
    console.log(response);
    const data = await response.json;
    console.log(data);
    return data;
}

export function like_post(postHashHex, consumer_public_key){
    const param = {postHash: postHashHex, key:consumer_public_key};
    const response = await fetch(URL + '/like_post/', {
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

export function get_liked_post(public_key){
    const response = await fetch(URL + '/get_single_post/' + public_key)
    console.log(response);
    const data = await response.json;
    console.log(data);
    return data;
}



 

