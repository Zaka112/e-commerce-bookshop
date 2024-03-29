import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "types/types";

type SingleUser = {
  userInformation: User | null;
  isLogin: boolean;
  isLoading: boolean;
  item: string;
 // publishableKey: string ;
};

const storedUserState = localStorage.getItem("userState");

const initialState: SingleUser = storedUserState
  ? JSON.parse(storedUserState)
  : {
      userInformation: null,
      isLogin: false,
      isLoading: true,
      item: "",
      //publishableKey: "",
    };

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.userInformation = action.payload;
      state.isLogin = true;
      state.isLoading = false;
    },
    userLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
      const obj = {
        value: "value",
        expires: new Date().setDate(new Date().getDate()).toString(),
      };

      localStorage.setItem("userState", JSON.stringify(state));
    },
    removeUserData: (state) => {
      state.userInformation = initialState.userInformation;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userState");
      localStorage.clear();
      state.isLogin = false;
      state.isLoading = false;
    },
    // publishable key thunk
    // getPayment: (state, action: PayloadAction<string>) => {
    //   state.publishableKey = action.payload;
    // },
  },
});

export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
