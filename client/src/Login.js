import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";


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


// function signUp(type) {

//   // center the window.
//   const h = 1000;
//   const w = 800;
//   const y = window.outerHeight / 2 + window.screenY - h / 2;
//   const x = window.outerWidth / 2 + window.screenX - w / 2;
//   identityWindow = window.open("https://identity.deso.org/log-in", null, `toolbar=no, width=${w}, height=${h}, top=${y}, left=${x}`);
// }


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



function Login({setUserKey, setLoggedIn, setUser, setType}) {

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

        setUserKey(payload.publicKeyAdded);  
        setLoggedIn(true);

        console.log("Logged in!");
      }
    });

  }, []);

  
  return (    
    <div className="Login" style={{marginTop: -20}}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
      }}>  
        <Button onClick={initLogin}>
          Login with Deso
        </Button>
        {/* <Button onClick={() => signUp("artists")}>
          Sign up as an Artist
        </Button>
        <Button onClick={() => signUp("consumers")}>
          Sign up as a Viewer
        </Button> */}
      </Box>
    </div>
  );
};



export default Login;