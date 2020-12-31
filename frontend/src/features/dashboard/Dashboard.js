import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  getUserWeightData,
  addRecord,
  deleteRecord,
  initRecords,
  selectWeight,
} from "./dashboardSlice";

const AxisLabel = ({ axisType, x, y, width, height, stroke, children }) => {
  const isVert = axisType === "yAxis";
  const cx = isVert ? x : x + width / 2;
  const cy = isVert ? height / 2 + y : y + height + 10;
  const rot = isVert ? `270 ${cx} ${cy}` : 0;
  return (
    <text
      x={cx}
      y={cy}
      transform={`rotate(${rot})`}
      textAnchor="middle"
      stroke={stroke}
    >
      {children}
    </text>
  );
};

export function Dashboard() {
  const weightData = useSelector(selectWeight);
  const dispatch = useDispatch();
  const { getAccessTokenSilently, user } = useAuth0();
  let token = null;
  getAccessTokenSilently()
    .then((t) => {
      token = t;
    })
    .catch(() => {});

  return (
    <div className="dashboard">
      <LineChart width={1000} height={500} data={weightData ? weightData : []}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" label="Date" />
        <YAxis dataKey="weight" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
      </LineChart>
      <Button onClick={() => dispatch(getUserWeightData(user, token))}>
        Get Data
      </Button>
    </div>
  );
}
