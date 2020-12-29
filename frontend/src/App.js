import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.css";
import PrivateRoute from "./features/routing/PrivateRoute";
import LoginPage from "./features/loginPage/LoginPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <PrivateRoute path="/" exact>
            Protected Page
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
