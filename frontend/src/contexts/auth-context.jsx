import React, { useReducer, createContext } from "react";

// Create Context Object
export const AuthContext = createContext();

const initState = {
  loggedIn: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN_SUCCESS":
      return { ...state, loggedIn: true };
    case "LOG_OUT_SUCCESS":
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};
// Create a provider for components to consume and subscribe to changes
export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
};
