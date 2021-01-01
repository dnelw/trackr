import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../api/User";
import { addWeightEntryCall, deleteWeightEntryCall } from "../../api/Weight";

export const weightTrackrSlice = createSlice({
  name: "weightTrackr",
  initialState: {
    loading: true,
    weight: [],
    showAddEntryModal: false,
    showNotification: false,
    notificationType: "error",
    notificationMessage: "Unknown Error",
    notificationDescription: "An unknown error occured",
    isShowDeleteModal: false,
  },
  reducers: {
    initRecords: (state, action) => {
      state.weight = action.payload.map((entry) => {
        return {
          ...entry,
          date: new Date(entry.date).toISOString().split("T")[0],
        };
      });
      state.loading = false;
    },
    addRecord: (state, action) => {
      state.weight.push(action.payload);
    },
    deleteRecord: (state, action) => {
      state.weight = state.weight.filter((entry) => {
        return entry.date !== action.payload.date;
      });
    },
    toggleEntryModal: (state) => {
      state.showAddEntryModal = !state.showAddEntryModal;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setNotLoading: (state) => {
      state.loading = false;
    },
    showNotification: (state) => {
      state.showNotification = true;
    },
    closeNotification: (state) => {
      state.showNotification = false;
    },
    setNotification: (state, action) => {
      const { type, message, description } = action.payload;
      state.notificationDescription = description;
      state.notificationMessage = message;
      state.notificationType = type;
    },
    showDeleteModal: (state) => {
      state.isShowDeleteModal = true;
    },
    closeDeleteModal: (state) => {
      state.isShowDeleteModal = false;
    },
  },
});

export const {
  addRecord,
  deleteRecord,
  initRecords,
  toggleEntryModal,
  setLoading,
  setNotLoading,
  showDeleteModal,
  closeDeleteModal,
  setNotification,
  showNotification,
  closeNotification,
} = weightTrackrSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getUserWeightData = (user, token) => (dispatch) => {
  getUser(user, token)
    .then((data) => {
      if (data) {
        dispatch(initRecords(data.data.user.weight));
      }
    })
    .catch((err) => {
      dispatch(
        setNotification({
          type: "error",
          message: "Failed to get trackr data",
          description: "Something went wrong on our end!",
        })
      );
      dispatch(showNotification());
      dispatch(setNotLoading());
      setTimeout(() => dispatch(closeNotification()), 1000);
    });
};

export const addWeightEntry = (user, token, date, weight) => (dispatch) => {
  dispatch(setLoading());
  const formattedDate = new Date(date).toISOString().split("T")[0];
  addWeightEntryCall(user, token, date, weight)
    .then((data) => {
      if (data.status === 200) {
        dispatch(toggleEntryModal());
        dispatch(
          addRecord({
            date: formattedDate,
            weight,
          })
        );
        dispatch(setNotLoading());
      }
    })
    .catch((err) => {
      dispatch(
        setNotification({
          type: "error",
          message: "Failed to add entry",
          description: "Something went wrong on our end!",
        })
      );
      dispatch(showNotification());
      dispatch(setNotLoading());
      setTimeout(() => dispatch(closeNotification()), 100);
    });
};

export const deleteWeightEntry = (user, token, date) => (dispatch) => {
  dispatch(setLoading());
  const formattedDate = new Date(date).toISOString().split("T")[0];
  deleteWeightEntryCall(user, token, date)
    .then((data) => {
      if (data.status === 200) {
        dispatch(closeDeleteModal());
        dispatch(
          deleteRecord({
            date: formattedDate,
          })
        );
        dispatch(setNotLoading());
      }
    })
    .catch((err) => {
      dispatch(
        setNotification({
          type: "error",
          message: "Failed to delete entry",
          description: "Something went wrong on our end!",
        })
      );
      dispatch(showNotification());
      dispatch(setNotLoading());
      setTimeout(() => dispatch(closeNotification()), 100);
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectWeight = (state) => state.weightTrackr.weight;
export const selectShowAddEntryModal = (state) =>
  state.weightTrackr.showAddEntryModal;
export const selectIsLoading = (state) => state.weightTrackr.loading;
export const selectIsShowDeleteModal = (state) =>
  state.weightTrackr.isShowDeleteModal;
export const selectNotificationType = (state) =>
  state.weightTrackr.notificationType;
export const selectNotificationDescription = (state) =>
  state.weightTrackr.notificationDescription;
export const selectNotificationMessage = (state) =>
  state.weightTrackr.notificationMessage;
export const selectShowNotification = (state) =>
  state.weightTrackr.showNotification;
export default weightTrackrSlice.reducer;
