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
  selectSaveLoading,
  selectDeleteLoading,
  selectAddLoading,
  addWeightEntry,
  selectShowNotification,
  selectIsShowDeleteModal,
  closeDeleteModal,
  showDeleteModal,
  deleteWeightEntry,
  selectNotificationDescription,
  selectNotificationMessage,
  selectNotificationType,
  modifyWeightEntry,
} from "./weightTrackrSlice";

const popupNotification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};

const formatData = (weightData, dataPeriod) => {
  if (weightData.length === 0) {
    return [];
  }
  let sortedWeightData = [...weightData];
  sortedWeightData.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  let allDates = [];
  let start = null;
  const todayDate = new Date().toISOString().split("T")[0];
  const end = moment(todayDate);
  if (dataPeriod === "ytd") {
    start = moment(sortedWeightData[0].date);
  } else {
    start = moment(todayDate);
    start.subtract(dataPeriod - 1, "days");
    sortedWeightData = sortedWeightData.filter((entry) => {
      return moment(entry.date) >= start;
    });
    start = moment.max(start, moment(sortedWeightData[0].date));
  }
  while (start <= end) {
    allDates.push(moment(start).format("YYYY-MM-DD"));
    start.add(1, "days");
  }
  const allEntryDates = {};
  sortedWeightData.forEach((entry) => {
    allEntryDates[entry.date] = entry.weight;
  });
  allDates = allDates.map((date) => {
    if (date in allEntryDates) {
      return {
        date,
        weight: allEntryDates[date],
      };
    } else {
      return { date };
    }
  });
  allDates.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return allDates;
};

function createWeightTrackrGraph(weightData, dataPeriod, dotClickHandler) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={formatData(weightData, dataPeriod)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="weight" />
        <Tooltip />
        <Legend verticalAlign="top" />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="weight"
          stroke="#1890ff"
          activeDot={{
            stroke: "#1890ff",
            strokeWidth: 2,
            fill: "#fff",
            r: 6,
            onClick: dotClickHandler,
          }}
          fill="#1890ff"
          r={4}
          connectNulls={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function modifyEntryOnOkHandler(
  user,
  token,
  modifyFormDate,
  modifyFormWeight,
  dispatch,
  modifyWeightEntry,
  setModifyFormWeightError
) {
  if (modifyFormDate && modifyFormWeight) {
    dispatch(
      modifyWeightEntry(user, token.current, modifyFormDate, modifyFormWeight)
    );
  }
  if (!modifyFormWeight) {
    setModifyFormWeightError("error");
  }
}

function addEntryOnOkHandler(
  user,
  token,
  entryFormDate,
  entryFormWeight,
  weightData,
  popupNotification,
  dispatch,
  addWeightEntry,
  setEntryFormDateError,
  setEntryFormWeightError
) {
  if (entryFormDate && entryFormWeight) {
    let found = false;
    weightData.forEach((entry) => {
      if (entry.date === new Date(entryFormDate).toISOString().split("T")[0]) {
        found = true;
      }
    });
    if (found) {
      popupNotification(
        "warning",
        "Entry already exists!",
        "You are trying to make an entry on a date that already contains one."
      );
    } else {
      dispatch(
        addWeightEntry(user, token.current, entryFormDate, entryFormWeight)
      );
    }
  }
  if (!entryFormDate) {
    setEntryFormDateError("error");
  }
  if (!entryFormWeight) {
    setEntryFormWeightError("error");
  }
}

function createAddEntryModal(
  showEntryModal,
  isAddLoading,
  onOkHandler,
  onCancelHandler,
  formValueChangeHandler,
  entryFormDateError,
  entryFormWeightError
) {
  return (
    <Modal
      title="Add Entry"
      visible={showEntryModal}
      onOk={onOkHandler}
      confirmLoading={isAddLoading}
      onCancel={onCancelHandler}
    >
      <Form
        layout="horizontal"
        initialValues={{
          date: moment(new Date(), "YYYY-MM-DD"),
        }}
        onValuesChange={formValueChangeHandler}
      >
        <Form.Item
          label="Date"
          name="date"
          hasFeedback
          validateStatus={entryFormDateError}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Weight"
          name="weight"
          hasFeedback
          validateStatus={entryFormWeightError}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
}

function createDeleteModal(
  deleteFormRef,
  isShowDeleteModal,
  isDeleteLoading,
  onDeleteHandler,
  onCancelHandler,
  onSaveHandler,
  isSaveLoading,
  modifyFormWeightError,
  formValueChangeHandler,
  setValues
) {
  return (
    <Modal
      title="Delete / Modify"
      visible={isShowDeleteModal}
      onCancel={onCancelHandler}
      footer={[
        <Button
          key="submit"
          danger
          loading={isDeleteLoading}
          onClick={onDeleteHandler}
          style={{ float: "left" }}
        >
          Delete
        </Button>,
        <Button key="cancel" onClick={onCancelHandler}>
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          loading={isSaveLoading}
          onClick={onSaveHandler}
        >
          Save
        </Button>,
      ]}
    >
      <Form
        ref={deleteFormRef}
        layout="horizontal"
        onValuesChange={formValueChangeHandler}
      >
        <Form.Item label="Date" name="date">
          <DatePicker disabled />
        </Form.Item>
        <Form.Item
          label="Weight"
          name="weight"
          hasFeedback
          validateStatus={modifyFormWeightError}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
}

function getCorrespondingWeight(weightData, date) {
  let weight = null;
  weightData.forEach((entry) => {
    if (entry.date === date) {
      weight = entry.weight;
    }
  });
  return weight;
}

export function WeightTrackrPage() {
  const weightData = useSelector(selectWeight);
  const showEntryModal = useSelector(selectShowAddEntryModal);
  const showNotification = useSelector(selectShowNotification);
  const isShowDeleteModal = useSelector(selectIsShowDeleteModal);
  const notificationType = useSelector(selectNotificationType);
  const notificationMessage = useSelector(selectNotificationMessage);
  const notificationDescription = useSelector(selectNotificationDescription);
  const isSaveLoading = useSelector(selectSaveLoading);
  const isAddLoading = useSelector(selectAddLoading);
  const isDeleteLoading = useSelector(selectDeleteLoading);
  const dispatch = useDispatch();
  const { getAccessTokenSilently, user } = useAuth0();
  const [entryFormDate, setEntryFormDate] = useState(
    moment(new Date(), "YYYY-MM-DD")
  );
  const [entryFormWeight, setEntryFormWeight] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [modifyFormWeight, setModifyFormWeight] = useState();
  const [entryFormDateError, setEntryFormDateError] = useState();
  const [entryFormWeightError, setEntryFormWeightError] = useState();
  const [modifyFormWeightError, setModifyFormWeightError] = useState();
  const [dataPeriod, setDataPeriod] = useState(30);

  const token = useRef(null);
  const deleteFormRef = useRef(null);
  useEffect(() => {
    getAccessTokenSilently().then((t) => {
      token.current = t;
      dispatch(getUserWeightData(user, token.current));
    });
  }, [token, dispatch, getAccessTokenSilently, user]);

  useEffect(() => {
    if (deleteFormRef.current) {
      deleteFormRef.current.setFieldsValue({
        date: moment(selectedDate),
        weight: getCorrespondingWeight(weightData, selectedDate),
      });
    }
  }, [weightData, selectedDate, deleteFormRef]);

  useEffect(() => {
    if (showNotification) {
      popupNotification(
        notificationType,
        notificationMessage,
        notificationDescription
      );
    }
  }, [
    showNotification,
    notificationType,
    notificationMessage,
    notificationDescription,
  ]);

  return (
    <div className="weight-dashboard">
      <div className="weight-dashboard-graph">
        {createWeightTrackrGraph(weightData, dataPeriod, (data) => {
          dispatch(showDeleteModal());
          setSelectedDate(data.payload.date);
          setModifyFormWeight(
            getCorrespondingWeight(weightData, data.payload.date)
          );
        })}
      </div>
      <div className="weight-dashboard-actions">
        <Select
          defaultValue={30}
          style={{ width: 130 }}
          onChange={(period) => setDataPeriod(period)}
        >
          <Select.Option value={30}>Last 30 days</Select.Option>
          <Select.Option value={90}>Last 90 days</Select.Option>
          <Select.Option value={365}>Last year</Select.Option>
          <Select.Option value="ytd">YTD</Select.Option>
        </Select>

        <Button
          className="add-entry-btn"
          onClick={() => dispatch(toggleEntryModal())}
        >
          Add Entry
        </Button>
      </div>
      {createAddEntryModal(
        showEntryModal,
        isAddLoading,
        () =>
          addEntryOnOkHandler(
            user,
            token,
            entryFormDate,
            entryFormWeight,
            weightData,
            popupNotification,
            dispatch,
            addWeightEntry,
            setEntryFormDateError,
            setEntryFormWeightError
          ),
        () => dispatch(toggleEntryModal()),
        (cv, v) => {
          setEntryFormDateError(null);
          setEntryFormWeightError(null);
          if (v.date) {
            setEntryFormDate(v.date.format("YYYY-MM-DD"));
          } else {
            setEntryFormDate(null);
          }
          if (v.weight) {
            setEntryFormWeight(v.weight);
          } else {
            setEntryFormWeight(null);
          }
        },
        entryFormDateError,
        entryFormWeightError
      )}
      {createDeleteModal(
        deleteFormRef,
        isShowDeleteModal,
        isDeleteLoading,
        () => {
          dispatch(deleteWeightEntry(user, token.current, selectedDate));
        },
        () => dispatch(closeDeleteModal()),
        () =>
          modifyEntryOnOkHandler(
            user,
            token,
            selectedDate,
            modifyFormWeight,
            dispatch,
            modifyWeightEntry,
            setModifyFormWeightError
          ),
        isSaveLoading,
        modifyFormWeightError,
        (cv, v) => {
          setModifyFormWeightError(null);
          if (v.weight) {
            setModifyFormWeight(v.weight);
          } else {
            setModifyFormWeight(null);
          }
        },
        modifyFormWeight
      )}
    </div>
  );
}
