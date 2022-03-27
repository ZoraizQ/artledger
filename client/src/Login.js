import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { get_consumer_info, sign_up } from './api';
import './Header.css';

let init = false;
let iframe = null;
let pendingRequests = [];
let identityWindow = null;


function initLogin() {  
    // center the window.
    const h = 1000;
    const w = 800;
    const y = window.outerHeight / 2 + window.screenY - h / 2;
    const x = window.outerWidth / 2 + window.screenX - w / 2;
    identityWindow = window.open("https://identity.deso.org/log-in", null, `toolbar=no, width=${w}, height=${h}, top=${y}, left=${x}`);
}


function signUp(type) {

  // center the window.
  const h = 1000;
  const w = 800;
  const y = window.outerHeight / 2 + window.screenY - h / 2;
  const x = window.outerWidth / 2 + window.screenX - w / 2;
  identityWindow = window.open("https://identity.deso.org/log-in", null, `toolbar=no, width=${w}, height=${h}, top=${y}, left=${x}`);
}


function handleInit(e) {
    if (!init) {
        init = true;
        iframe = document.getElementById("identity");

        for (const e of pendingRequests) {
            postMessage(e);
        }
        
        pendingRequests = []
    }
    respond(e.source, e.data.id, {})
}


function handleLogin(payload) {
    console.log(payload);
    if (identityWindow) {
        identityWindow.close();
        identityWindow = null;
    }
}


function respond(e, t, n) {
    e.postMessage({
        id: t,
        service: "identity",
        payload: n
    }, "*")    
}


function postMessage(e) {
    init ? this.iframe.contentWindow.postMessage(e, "*") : pendingRequests.push(e)    
}



function Login({setUserKey, setLoggedIn, setUser, setSeedHex, setType}) {
  const [loginType, setLoginType] = useState("login");

  useEffect(() => {
    // const childWindow = document.getElementById('identity').contentWindow;
    window.addEventListener('message', message => {
      console.log('message: ');
      
      const {data: {id: id, method: method, payload: payload}} = message;    

      console.log(id);
      console.log(method);
      console.log(payload);

      if (method == 'initialize') {
          handleInit(message);
      } else if (method == 'login') {
        console.log("payload", payload);
        handleLogin(payload);

        const key = payload.publicKeyAdded;
        console.log('seedhex', payload.users[key].encryptedSeedHex)
        setSeedHex(payload.users[key].encryptedSeedHex);

        if (loginType == "signUp") { // only sign up button for artists right now
          sign_up(key, "artists");
        }
        // else {
        //   sign_up(key, "consumers");
        // }

        setUserKey(payload.publicKeyAdded);  
        setLoggedIn(true);

        get_consumer_info(payload.publicKeyAdded).then(userInfo => 
          {console.log('userInfo', userInfo); setUser(userInfo)}
          );
        
        console.log("Logged in!");
      }
    });

  }, []);

  
  return (    
    <div className="Login" style={{marginTop: -20}}>
      <div style={{padding: 50}}></div>
      <img className="deso-logo"
      src="https://logowik.com/content/uploads/images/decentralized-social-deso3198.jpg" 
      loading="eager" alt="" width="200" height="150"/>
        
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
      }}>  
        <Button variant="contained" onClick={() => {setLoginType("login"); initLogin();}}>
          Login with Deso
        </Button>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
        <Button variant="contained" color="secondary" onClick={() => {setLoginType("signUp"); signUp("artists");}}>
          Sign up as an Artist
        </Button>
        {/* <Button onClick={() => signUp("consumers")}>
          Sign up as a Viewer
        </Button> */}
      </Box>
    </div>
  );
};



export default Login;