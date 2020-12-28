import { createSlice } from "@reduxjs/toolkit";
import { login } from "../auth/authSlice";

export const loginPageSlice = createSlice({
  name: "loginPage",
  initialState: {},
  reducers: {},
});

export const {} = loginPageSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const sendLoginRequest = () => (dispatch) => {
  setTimeout(() => {
    dispatch(login());
  }, 1000);
};

export default loginPageSlice.reducer;
