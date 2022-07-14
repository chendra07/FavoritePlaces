import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { loading_reducer, placeList_reducer } from "./reducers";

const rootReducer = combineReducers({
  loading: loading_reducer,
  placeList: placeList_reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // whitelist: ["placeList"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true,
});
