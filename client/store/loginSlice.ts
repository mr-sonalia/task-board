import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from ".";

interface ITask {
	task_title: string;
	task_description: string;
	task_completion_status: boolean;
	task_creation_date: Date;
	task_deadline: Date;
	_id: string;
}

interface IList {
	_id: string;
	list_creation_date: Date;
	list_title: string;
	tasks: ITask[];
}

interface IUser {
	_id: string;
	username: string;
	name: {
		first: string;
		middle?: string;
		last: string;
	};
	email: string;
	passwordHash: string;
	lists: [];
}

interface ILogin {
	user: IUser | {};
	error: string;
	loading: boolean;
	loggedin: boolean;
}

const initialState: ILogin = {
	user: {},
	error: "",
	loading: false,
	loggedin: false
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		loginSuccess: (
			state: ILogin = initialState,
			action: PayloadAction<IUser>
		) => {
			state.user = action.payload;
			state.loading = false;
			state.error = "";
			state.loggedin = true;
		},
		loginFailure: (
			state: ILogin = initialState,
			action: PayloadAction<string>
		) => {
			state.loading = false;
			state.loggedin = false;
			state.error = action.payload;
		},
		setLoading: (state: ILogin = initialState) => void (state.loading = true),
	},
});

export const { loginSuccess, loginFailure, setLoading } = loginSlice.actions;

export const loginUserAction = (credentials: {
	usernameOrEmail: string;
	password: string;
}) => {
	return async (dispatch: AppDispatch) => {
		dispatch(setLoading());
		try {
			const response = await axios.post(`http://localhost:4000/api/login`, {
				usernameOrEmail: credentials.usernameOrEmail.trim(),
				password: credentials.password.trim()
			});

			console.log(response.data);
			if (response.status === 200 && response.data.error === "") {
				dispatch(loginSuccess(response.data.user));
			} else throw response.data.error;
		} catch (e) {
			let error = "";
			if (typeof e === "string") error = e;
			else if (e instanceof Error) error = e.message;

			dispatch(loginFailure(error));
		}
	};
};

export const loginReducer = loginSlice.reducer;
