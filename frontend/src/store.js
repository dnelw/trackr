import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import weightTrackrReducer from "./features/weightTrackr/weightTrackrSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    weightTrackr: weightTrackrReducer,
  },
});
