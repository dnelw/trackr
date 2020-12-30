import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    weight: [],
  },
  reducers: {
    addRecord: (state, action) => {
      state.weight.push(action.data);
    },
    deleteRecord: (state, action) => {
      state.weight = state.weight.filter((entry) => {
        return entry.date !== action.date;
      });
    },
  },
});

export const { addRecord, deleteRecord } = dashboardSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectWeight = (state) => state.weight;

export default dashboardSlice.reducer;
