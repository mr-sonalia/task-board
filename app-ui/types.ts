/** @format */

// ui
export interface ColumnSizes {
	xs: number;
	sm: number;
	md: number;
	lg: number;
	xl: number;
}

export type ContainerSize = "xl" | "lg" | "md" | "sm" | "xs";

export interface UiPreferences {
	colorScheme: "light" | "dark";
}

// State schemas
export interface ITask {
	id: string;
	taskTitle: string;
	taskDescription: string;
	taskIsCompleted: boolean;
	taskNotification: boolean;
	taskDeadline: string;
}

export interface ITaskList {
	id: string;
	listTitle: string;
	taskList: ITask[];
}

export type ITaskBoard = ITaskList[];

// export interface INewTaskItem {
// 	id: string;
// 	taskTitle: string;
// 	taskDescription: string;
// 	taskNotification: boolean;
// 	taskDeadline: string;
// }

export interface INewTaskList {
	listTitle: string;
}
