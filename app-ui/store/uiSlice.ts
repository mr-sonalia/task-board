import { createSlice } from "@reduxjs/toolkit";
import { UiPreferences } from "../types";

const initialState: UiPreferences = {
	colorScheme: "dark",
};

export const uiSlice = createSlice({
	name: "uiSlice",
	initialState,
	reducers: {
		switchColorScheme: (state: UiPreferences) => {
			state.colorScheme = state.colorScheme === "light" ? "dark" : "light";
			console.log(state.colorScheme)
		},
	},
});

// Action creators are generated for each case reducer function
export const { switchColorScheme } = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
