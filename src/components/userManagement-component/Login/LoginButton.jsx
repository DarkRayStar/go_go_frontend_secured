import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from "axios";
const configFile = require('../../../config.json');

const LoginButton = () => {

  return (
    <div className="App">
        <GoogleOAuthProvider clientId= {configFile.GOOGLE_OAUTH_CLIENT_ID}>
            <GoogleLogin

                onSuccess={credentialResponse => {
                const loggedUser = jwt_decode(credentialResponse.credential).email;
                window.sessionStorage.setItem("oAuthSession", JSON.stringify(jwt_decode(credentialResponse.credential)));
                window.sessionStorage.setItem("loggeduser", JSON.stringify(loggedUser));
                try{setTimeout(() => {
                    if (loggedUser === "kamal@gmail.com") {
                      window.location = "/user-admin-dashboard";
                    } else if (loggedUser === "tharinduadmin@gmail.com") {
                      window.location = "/storeAdmindash";
                    } else if (loggedUser === "dulshanalaha@gmail.com") {
                      window.location = "/delivery-home";
                    } else {
                        axios.get(`http://localhost:5050/user/find-by-email/${loggedUser}`)
                        .then(response => {
                          const userData = response.data;
                          console.log(response.data)
                          if (userData.message == "no-users") {
                            window.alert("You are not previously registered. Please Register.")
                            window.location = "/registration";
                          } else {
                            window.location = "/userHome";
                          }
                        })
                        .catch(error => {
                          console.error("Error fetching user data:", error);
                        });
                      ;
                    }
                  }, 2000);
                } catch (error) {
                    if (
                      error.response &&
                      error.response.status >= 400 &&
                      error.response.status <= 500
                    ) {
                      setError(error.response.data.message);
                    }
                  }
                }}
            
                onError={() => {
                console.log('Login Failed/ OAuth Authentication Failed');
                }}
            
            />
          </GoogleOAuthProvider>

      </div>
  );
};

export default LoginButton;