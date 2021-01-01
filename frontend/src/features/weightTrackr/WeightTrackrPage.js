import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
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
  Button,
  Modal,
  notification,
  InputNumber,
  DatePicker,
  Form,
  Select,
} from "antd";

import {
  getUserWeightData,
  selectWeight,
  toggleEntryModal,
  selectShowAddEntryModal,
  selectIsLoading,
  addWeightEntry,
  selectShowNotification,
  selectIsShowDeleteModal,
  closeDeleteModal,
  showDeleteModal,
  deleteWeightEntry,
  selectNotificationDescription,
  selectNotificationMessage,
  selectNotificationType,
} from "./weightTrackrSlice";

const popupNotification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};

export function WeightTrackrPage() {
  const weightData = useSelector(selectWeight);
  const showEntryModal = useSelector(selectShowAddEntryModal);
  const showNotification = useSelector(selectShowNotification);
  const isShowDeleteModal = useSelector(selectIsShowDeleteModal);
  const notificationType = useSelector(selectNotificationType);
  const notificationMessage = useSelector(selectNotificationMessage);
  const notificationDescription = useSelector(selectNotificationDescription);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const { getAccessTokenSilently, user } = useAuth0();
  const [entryFormDate, setEntryFormDate] = useState();
  const [entryFormWeight, setEntryFormWeight] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const token = useRef(null);
  useEffect(() => {
    getAccessTokenSilently().then((t) => {
      token.current = t;
      dispatch(getUserWeightData(user, token.current));
    });
  }, [token, dispatch, getAccessTokenSilently, user]);

  useEffect(() => {
    if (showNotification) {
      popupNotification(
        notificationType,
        notificationMessage,
        notificationDescription
      );
    }
  }, [showNotification]);

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
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#1890ff"
              activeDot={{
                onClick: (data) => {
                  dispatch(showDeleteModal());
                  setSelectedDate(data.payload.date);
                },
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="weight-dashboard-actions">
        <Select
          defaultValue="30"
          style={{ width: 130 }}
          onChange={(data) => console.log(data)}
        >
          <Select.Option value="30">Last 30 days</Select.Option>
          <Select.Option value="90">Last 90 days</Select.Option>
          <Select.Option value="365">Last year</Select.Option>
          <Select.Option value="ytd">YTD</Select.Option>
        </Select>

        <Button
          className="add-entry-btn"
          onClick={() => dispatch(toggleEntryModal())}
        >
          Add Entry
        </Button>
      </div>
      <Modal
        title="Add Entry"
        visible={showEntryModal}
        onOk={() =>
          dispatch(
            addWeightEntry(user, token.current, entryFormDate, entryFormWeight)
          )
        }
        confirmLoading={isLoading}
        onCancel={() => dispatch(toggleEntryModal())}
      >
        <Form
          layout="horizontal"
          initialValues={{
            date: moment(new Date(), "YYYY-MM-DD"),
          }}
          onValuesChange={(cv, v) => {
            if (v.date) {
              setEntryFormDate(v.date.format("YYYY-MM-DD"));
            }
            if (v.weight) {
              setEntryFormWeight(v.weight);
            }
          }}
        >
          <Form.Item label="Date" name="date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Weight" name="weight">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Are you sure?"
        visible={isShowDeleteModal}
        onOk={() => {
          dispatch(deleteWeightEntry(user, token.current, selectedDate));
        }}
        confirmLoading={isLoading}
        onCancel={() => dispatch(closeDeleteModal())}
      >
        Would you like to delete your entry for {selectedDate}?
      </Modal>
    </div>
  );
}
