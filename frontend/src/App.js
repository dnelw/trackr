import React from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";
import NavBar from "./features/routing/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./features/feedback/Loading";
import { Dashboard } from "./features/dashboard/Dashboard";
import ProtectedRoute from "./features/routing/ProtectedRoute";
import ExternalApi from "./features/temp/ExternalApi";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/external-api" exact component={ExternalApi} />
        <ProtectedRoute path="/" exact component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
