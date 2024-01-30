import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "types/types";

type SingleUser = {
  userInformation: User | null;
  isLogin: boolean;
  isLoading: boolean;
  item: string;
};

const storedUserState = localStorage.getItem("userState");
const initialState: SingleUser = storedUserState
  ? JSON.parse(storedUserState)
  : {
      userInformation: null,
      isLogin: false,
      isLoading: true,
      item: "",
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
      // const obj = {
      //   value: "value",
      //   expires: new Date().setDate(new Date().getDate() + 1).toString(),
      // };
      localStorage.setItem("userState", JSON.stringify(state));
      //localStorage.setItem("expireState", JSON.stringify(obj));
    },
    removeUserData: (state) => {
      state.userInformation = initialState.userInformation;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userState");
      localStorage.clear();
      state.isLogin = false;
      state.isLoading = false;
    },
    // checkTimeStamp: (state) => {
    //   const item = localStorage.getItem("expireState");
    //   const res =
    //     new Date().getTime().toString() > JSON.parse(item as string).expires;
    //   // Returns true if timestamp for now is greater than expiration (item has 'expired')

    //   if (res) {
    //     localStorage.removeItem("userState");
    //     localStorage.removeItem("expireState")
    //     // item is removed if the value of res is true
    //   }
    // },
  },
});

export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
