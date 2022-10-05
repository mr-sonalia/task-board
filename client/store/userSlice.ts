import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from ".";

const userSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {},
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
