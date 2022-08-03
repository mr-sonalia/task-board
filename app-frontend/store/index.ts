import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { listsSlice } from "./boardSlice";
import { ui } from "./uiSlice";

const store = configureStore({
	reducer: { lists: listsSlice, ui },
	// middleware: []
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
