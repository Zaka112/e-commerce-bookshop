import React, { useState } from "react";

import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

import user from "../../../assets/user.jpg";
import { BASE_URL } from "../../../api";


export type UserGoogle = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};
export default function GoogleLogIn() {
  const [userGoogle, setUserGoogle] = useState<UserGoogle>({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    avatar: user,
  });
  // function
  return (
    <div>
      <h1>GoogleLogIn</h1>
      <GoogleLogin
        // type="icon"
        size="medium"
        shape="rectangular"
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse, "credential");
          const url = `${BASE_URL}/users/google-login`;
          const credential = credentialResponse.credential;
          let res = await axios.post(url, { id_token: credential });
          if (res.status === 200) {
            console.log(res, "response from BE");
            setUserGoogle(res.data.userData);
          } else {
            alert("Login false");
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <h1> user information from google</h1>
      <p> first Name:{userGoogle.firstName} </p>
      <p> last name: {userGoogle.lastName}</p>
      <img
        src={userGoogle.avatar}
        alt={userGoogle.email}
        height="50px"
        width="50px"
      />
    </div>
  );
}