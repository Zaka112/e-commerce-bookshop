import React, { useState } from "react";

import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

import user from "../../../assets/user.jpg";
import { BASE_URL } from "../../../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../../redux/slices/user";
import { Paper } from "@mui/material";

export type UserGoogle = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatar: string;
};
export default function GoogleLogIn() {
  const [userGoogle, setUserGoogle] = useState<UserGoogle>({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    avatar: user,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Paper >
     
      <GoogleLogin
    
        type="standard"
        size="large"
        shape="rectangular"
      
        onSuccess={async (credentialResponse) => {
          const url = `${BASE_URL}/users/google-login`;
          const credential = credentialResponse.credential;
          let res = await axios.post(url, { id_token: credential });
          if (res.status === 200) {
            setUserGoogle(res.data.userData);
          //  const user = res.data.userData;

            const userToken = res.data.token; // from data object. get and assign the token
             const userId = res.data.userData._id
             localStorage.setItem("userId", userId);
            localStorage.setItem("userToken", userToken); // save it (token) to the localStorage
            
            // const currentUserInformation: User = {
            //   ...user,
            //   token: userToken,
            // };
          //  const id = user._id;
            dispatch(userActions.setUserData(res.data.userData)); // store userinformation to the redux

            dispatch(userActions.userLogin(true));
            navigate("/books");
          } else {
            alert("Login false");
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
   
    </Paper>
  );
}
