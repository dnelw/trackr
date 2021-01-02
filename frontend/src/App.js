import React from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";
import { NavBar } from "./features/routing/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { ProtectedRoute } from "./features/routing/ProtectedRoute";
import { Loading } from "./features/feedback/Loading";
import { WeightTrackrPage } from "./features/weightTrackr/WeightTrackrPage";
import { HabitsTrackrPage } from "./features/habitsTrackr/HabitsTrackrPage";
import { Homepage } from "./features/homepage/Homepage";
function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <ProtectedRoute path="/weight" exact component={WeightTrackrPage} />
        <ProtectedRoute path="/habits" exact component={HabitsTrackrPage} />
      </Switch>
    </div>
  );
}

export default App;
