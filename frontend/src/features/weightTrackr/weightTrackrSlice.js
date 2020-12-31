import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../api/User";
import { addWeightEntryCall } from "../../api/Weight";

export const weightTrackrSlice = createSlice({
  name: "weightTrackr",
  initialState: {
    loading: true,
    weight: [],
    showAddEntryModal: false,
    failedAdding: false,
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
        return entry.date !== action.payload;
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
    showFailedAddingNotification: (state) => {
      state.failedAdding = true;
    },
    closeFailedAddingNotification: (state) => {
      state.failedAdding = false;
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
  showFailedAddingNotification,
  closeFailedAddingNotification,
} = weightTrackrSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getUserWeightData = (user, token) => (dispatch) => {
  getUser(user, token).then((data) => {
    if (data) {
      dispatch(initRecords(data.data.user.weight));
    }
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
      dispatch(showFailedAddingNotification());
      dispatch(setNotLoading());
      setTimeout(() => dispatch(closeFailedAddingNotification()), 1000);
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectWeight = (state) => state.weightTrackr.weight;
export const selectShowAddEntryModal = (state) =>
  state.weightTrackr.showAddEntryModal;
export const selectIsLoading = (state) => state.weightTrackr.loading;
export const selectFailedAdding = (state) => state.weightTrackr.failedAdding;
export default weightTrackrSlice.reducer;
