import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const LoginButton = () => {

  return (
    <div className="App">
        <GoogleOAuthProvider clientId="351554064926-kvnosp2lp0cskoqjcu3fmqg7m9bcke2a.apps.googleusercontent.com">
            <GoogleLogin

                onSuccess={credentialResponse => {
                const loggedUser = jwt_decode(credentialResponse.credential).email;
                window.sessionStorage.setItem("loggeduser", JSON.stringify(loggedUser));
                try{setTimeout(() => {
                    if (loggedUser === "kamal@gmail.com") {
                      window.location = "/user-admin-dashboard";
                    } else if (loggedUser === "tharinduadmin@gmail.com") {
                      window.location = "/storeAdmindash";
                    } else if (loggedUser === "dulshanalaha@gmail.com") {
                      window.location = "/delivery-home";
                    } else {
                      window.location = "/userHome";
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