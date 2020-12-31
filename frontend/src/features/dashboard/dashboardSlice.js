import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../api/User";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: true,
    weight: [],
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
  },
});

export const { addRecord, deleteRecord, initRecords } = dashboardSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getUserWeightData = (user, token) => (dispatch) => {
  getUser(user, token).then((data) => {
    dispatch(initRecords(data.data.user.weight));
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectWeight = (state) => state.dashboard.weight;

export default dashboardSlice.reducer;
