import { configureStore, combineReducers } from "@reduxjs/toolkit";
import status from "../reducers/login-slice";
const rootsReducer = combineReducers({
  onlineStatus: status,
})

const store = configureStore({
  reducer: rootsReducer,
});

export default store;