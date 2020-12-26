import React, { useState, useEffect } from "react";
import { AuthContextProvider } from "../contexts/auth-context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles/App.css";
import Navbar from "./Navbar";
import WeightTrackerPage from "./WeightTrackerPage";
import HabitTrackerPage from "./HabitTrackerPage";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div className="app-page">
          <div className="app-header">
            <Navbar />
          </div>
          <div className="app-content  container-fluid">
            <Switch>
              <Route path="/weight">
                <WeightTrackerPage />
              </Route>
              <Route path="/habits">
                <HabitTrackerPage />
              </Route>
            </Switch>
          </div>
          <div className="app-footer container-fluid">
            Trackr ©2020 Created by Daniel Wang
          </div>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
