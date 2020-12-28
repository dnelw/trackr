import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectLoggedIn } from "./features/auth/authSlice";

function App() {
  const loggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <button onClick={() => dispatch(login())}>Login</button>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <header className="App-header">{loggedIn ? <Counter /> : null}</header>
    </div>
  );
}

export default App;
