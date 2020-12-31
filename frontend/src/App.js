import React from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";
import NavBar from "./features/routing/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./features/feedback/Loading";
import { WeightTrackrPage } from "./features/weightTrackr/WeightTrackrPage";
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
        <Route path="/" exact component={() => <p>Homepage</p>} />
        <Route path="/external-api" exact component={ExternalApi} />
        <ProtectedRoute path="/weight" exact component={WeightTrackrPage} />
        <ProtectedRoute
          path="/habits"
          exact
          component={() => <p>Habits Page</p>}
        />
      </Switch>
    </div>
  );
}

export default App;
