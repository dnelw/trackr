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

import { Button, Modal, notification } from "antd";

import {
  getUserWeightData,
  selectWeight,
  toggleEntryModal,
  selectShowAddEntryModal,
  selectIsLoading,
  addWeightEntry,
  showFailedAddingNotification,
  selectFailedAdding,
} from "./weightTrackrSlice";

const failedAddingNotification = () => {
  notification["error"]({
    message: "Failed to add entry",
    description: "Something went wrong on our end :(",
  });
};

export function WeightTrackrPage() {
  const weightData = useSelector(selectWeight);
  const showEntryModal = useSelector(selectShowAddEntryModal);
  const showFailedAdding = useSelector(selectFailedAdding);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const { getAccessTokenSilently, user } = useAuth0();
  let token = null;
  getAccessTokenSilently().then((t) => {
    token = t;
  });
  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      dispatch(getUserWeightData(user, token));
    });
  }, []);

  useEffect(() => {
    if (showFailedAdding) {
      failedAddingNotification();
    }
  }, [showFailedAdding]);

  return (
    <div className="weight-dashboard">
      <div className="weight-dashboard-graph">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={[...weightData].sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            })}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="weight" />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Line type="monotone" dataKey="weight" stroke="#1890ff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Button
        className="add-entry-btn"
        onClick={() => dispatch(toggleEntryModal())}
      >
        Add Entry
      </Button>
      <Modal
        title="Add Entry"
        visible={showEntryModal}
        onOk={() => {
          dispatch(addWeightEntry(user, token, new Date(), 40));
        }}
        confirmLoading={isLoading}
        onCancel={() => dispatch(toggleEntryModal())}
      >
        <p>Form here</p>
      </Modal>
    </div>
  );
}
