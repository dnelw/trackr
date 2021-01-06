import { configureStore } from "@reduxjs/toolkit";
import weightTrackrReducer from "./features/weightTrackr/weightTrackrSlice";
import habitsTrackrReducer from "./features/habitsTrackr/habitsTrackrSlice";

export default configureStore({
  reducer: {
    weightTrackr: weightTrackrReducer,
    habitsTrackr: habitsTrackrReducer,
  },
});
