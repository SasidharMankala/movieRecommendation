import { combineReducers } from "@reduxjs/toolkit";
import dashSelectReducer from "./features/dashBoardScreen";


const rootReducer = combineReducers({
  selections: dashSelectReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
