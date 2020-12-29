import { createSlice } from "@reduxjs/toolkit";
import { login } from "../auth/authSlice";
import axios from "axios";

export const loginPageSlice = createSlice({
  name: "loginPage",
  initialState: {},
  reducers: {},
});

//export const {} = loginPageSlice.actions;

export const sendLoginRequest = (username, password) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_API_URI + "/auth/login", {
      username,
      password,
    })
    .then((res) => {
      dispatch(login(res.data.token));
    })
    .catch((err) => {
      console.log("Invalid credentials");
    });
};

export default loginPageSlice.reducer;
