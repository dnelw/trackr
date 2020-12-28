import React from "react";
import { sendLoginRequest } from "./loginPageSlice";
import { useDispatch } from "react-redux";
import { selectLoggedIn } from "../auth/authSlice";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function LoginPage() {
  const loggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();

  return loggedIn ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <button onClick={() => dispatch(sendLoginRequest())}>Log In</button>
  );
}
