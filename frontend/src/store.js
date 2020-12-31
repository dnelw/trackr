import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    dashboard: dashboardReducer,
  },
});
