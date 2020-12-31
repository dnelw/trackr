import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  getUserWeightData,
  addRecord,
  deleteRecord,
  initRecords,
  selectWeight,
} from "./weightTrackrSlice";

export function WeightTrackrPage() {
  const weightData = useSelector(selectWeight);
  const dispatch = useDispatch();
  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      dispatch(getUserWeightData(user, token));
    });
  });

  return (
    <div className="weight-dashboard">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={weightData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="weight" />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
