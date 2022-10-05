import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { listsReducer } from "./boardSlice";
import { loginReducer } from "./loginSlice";
import { uiReducer } from "./uiSlice";
import { userReducer } from "./userSlice";

const store = configureStore({
	reducer: {
		ui: uiReducer,
		user: userReducer,
		login: loginReducer,
		lists: listsReducer,
	},
	// middleware: []
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
