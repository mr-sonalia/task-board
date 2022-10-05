import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ITask, ITaskBoard, ITaskList } from "../types";
import { AppDispatch } from "./";

interface IBoard {
	board: ITaskBoard;
	isLoading: boolean;
	error: string;
}
const initialState: IBoard = {
	board: [],
	error: "",
	isLoading: true,
};

export const boardSlice = createSlice({
	initialState,
	name: "boardSlice",
	reducers: {
		// async
		fetchBoardSuccess: (state: IBoard = initialState, action: PayloadAction<ITaskBoard>) => {
			state.isLoading = false;
			state.error = "";
			state.board = action.payload;
		},
		setFailure: (state: IBoard = initialState, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		setLoading: (state: IBoard = initialState) => void (state.isLoading = true),

		//List level
		addNewList: (state: IBoard = initialState, action: PayloadAction<ITaskList>) => {
			state.board.push(action.payload);
			return state;
		},
		updateListTitle: (state: IBoard = initialState, action: PayloadAction<{ listId: string; listTitle: string }>) => {},
		deleteList: (state: IBoard = initialState, action: PayloadAction<{ id: string }>) => {
			state.board = state.board.filter(list => list.id !== action.payload.id);
		},

		// Task level
		newTask: (state: IBoard = initialState, action: PayloadAction<{ listID: string; task: ITask }>) => {
			const listIndex = state.board.findIndex(list => list.id == action.payload.listID);
			state.board[listIndex].taskList.push(action.payload.task);
		},
		updateTask: (state: IBoard = initialState, action: PayloadAction<{ listId: string; task: ITask }>) => {},
		deleteTask: (state: IBoard = initialState, action: PayloadAction<{ listId: string; taskId: string }>) => {},
		setBoard: () => {
			
		}
	},
});

export const {
	setLoading,
	setFailure,
	fetchBoardSuccess,
	addNewList,
	updateListTitle,
	deleteList,
	newTask,
	updateTask,
	deleteTask,
	setBoard
} = boardSlice.actions;

// export const fetchBoardAction = () => {
// 	return async (dispatch: AppDispatch) => {
// 		dispatch(setLoading());
// 		try {
// 			const response = await axios.get(`/api/board`);

// 			if (response.status === 200) {
// 				console.log(response.data);
// 				dispatch(fetchBoardSuccess(response.data));
// 			} else throw new Error("Could not fetch the data");
// 		} catch (e) {
// 			let error = "";
// 			if (typeof e === "string") error = e;
// 			else if (e instanceof Error) error = e.message;

// 			dispatch(setFailure(error));
// 		}
// 	};
// };

// export const createListAction = (listTitle: string) => {
// 	return async (dispatch: AppDispatch) => {
// 		try {
// 			const list = generateNewList(listTitle);
// 			const response = await axios.post(`/api/board`, list);

// 			if (response.status === 201) dispatch(addNewList(list));
// 			else throw `${response.status}: Could not add ${listTitle}`;
// 		} catch (e) {
// 			let error = "";
// 			if (typeof e === "string") error = e;
// 			else if (e instanceof Error) error = e.message;

// 			dispatch(setFailure(error));
// 		}
// 	};
// };

// export const deleteListAction = (id: string) => {
// 	return async (dispatch: AppDispatch) => {
// 		// console.log(data);
// 		try {
// 			const response = await axios.delete(`/api/board/${id}`);

// 			if (response.status === 200) dispatch(deleteList({ id }));
// 		} catch (e) {
// 			let error = "";
// 			if (typeof e === "string") error = e;
// 			else if (e instanceof Error) error = e.message;

// 			dispatch(setFailure(error));
// 		}
// 	};
// };

// export const createTaskAction = (listID: string, task: ITask) => {
// 	return async (dispatch: AppDispatch) => {
// 		try {
// 			const response = await axios.put(`$api/board/${listID}/taskList`, {
// 				taskList: [task],
// 			});

// 			if (response.status === 201) dispatch(newTask({ listID, task }));
// 		} catch (e) {
// 			let error = "";
// 			if (typeof e === "string") error = e;
// 			else if (e instanceof Error) error = e.message;

// 			dispatch(setFailure(error));
// 		}
// 	};
// };

export const listsReducer = boardSlice.reducer;
