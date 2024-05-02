import * as React from "react";

import Button from "@mui/material/Button";

import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
} from "firebase/auth";
import {
  useNavigate,
} from "react-router-dom";


import { useLocation } from "react-router-dom";
import { auth } from "../firebase-config"; // Import initialized Firebase auth instance


const Login = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const login=()=>{
    window.location.href =`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${"77ts72etc4g7cp"}&redirect_uri=${"http://localhost:3000/"}&state=foobar&scope=r_liteprofile%20r_emailaddress`;

    const search = location.search;
    const id=new URLSearchParams(search).get("code");
    console.log(id);//12345

  }
  const loginFB = () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        let authToken = sessionStorage.setItem("Auth Token", result?._tokenResponse?.idToken);

        navigate("/dashboard");

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };
  const loginGoggle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(result)
        let authToken = sessionStorage.setItem("Auth Token", result?._tokenResponse?.idToken);

        navigate("/dashboard");

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const loginMicrosoft = () => {
    const provider = new OAuthProvider("microsoft.com");
    const authenticator = getAuth()
    signInWithPopup(authenticator, provider)
      .then((result) => {
        // User is signed in.
        // IdP data available in result.additionalUserInfo.profile.

        // Get the OAuth access token and ID Token
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;
        let authToken = sessionStorage.setItem("Auth Token", result?._tokenResponse?.idToken);

        navigate("/dashboard");
      })
      .catch((error) => {
        // Handle error.
      });
  };

  return (
    <div>
      {/* <ToastContainer /> */}
      <Button
        variant="contained"
        onClick={loginMicrosoft}
        style={{ margin: "20px" }}
      >
        Sign In With Microsoft
      </Button>
      <Button
        variant="contained"
        onClick={loginGoggle}
        style={{ margin: "20px" }}
      >
        Sign In With Google
      </Button>
    </div>
  );
};

export default Login;
