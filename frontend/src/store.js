import { configureStore } from "@reduxjs/toolkit";
import weightTrackrReducer from "./features/weightTrackr/weightTrackrSlice";

export default configureStore({
  reducer: {
    weightTrackr: weightTrackrReducer,
  },
});
