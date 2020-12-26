import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import "../styles/App.css";

function App() {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Page has been open for <code>{count}</code> seconds.
        </p>
        <p>Env variable: {`${import.meta.env.SNOWPACK_PUBLIC_TEST_VAR}`}</p>
      </header>
    </div>
  );
}

export default App;
