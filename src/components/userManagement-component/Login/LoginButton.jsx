import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
const configFile = require("../../../config.json");

const LoginButton = () => {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={configFile.GOOGLE_OAUTH_CLIENT_ID}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const loggedUserEmail = jwt_decode(
              credentialResponse.credential
            ).email;
            window.sessionStorage.setItem(
              "oAuthSession",
              JSON.stringify(jwt_decode(credentialResponse.credential))
            );
            window.sessionStorage.setItem(
              "loggedUserEmail",
              JSON.stringify(jwt_decode(credentialResponse.credential).email)
            );

            var fetchedUser = "";
            axios
              .get(
                `http://localhost:5050/user/find-by-email/${loggedUserEmail}`
              )
              .then((response) => {
                fetchedUser = response.data;
              });

              window.sessionStorage.setItem(
                "loggedUser",
                JSON.stringify(fetchedUser)
              );

            try {
              

              setTimeout(() => {
                if (fetchedUser.userRole === "User Admin") {
                  var x = ""
                  window.location = "/user-admin-dashboard";
                } else if (fetchedUser.userRole === "Store Admind") {
                  window.location = "/storeAdmindash";
                } else if (fetchedUser.userRole === "Delivery Admin") {
                  window.location = "/delivery-home";
                } else {
                  
                  
                  if (fetchedUser.message == "no-users") {
                    window.alert(
                      "You are not previously registered. Please Register."
                    );
                    window.location = "/registration";
                  } else {
                    window.location = "/userHome";
                  }
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
            console.log("Login Failed/ OAuth Authentication Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default LoginButton;
