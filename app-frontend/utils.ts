import { v4 } from "uuid";
import { months } from "./constants";
import { ITaskList } from "./types";

/**
 * @description parses date in the Month DD, YYYY format
 * @param date
 */
export const parseDate = (date: Date): string => {
	const dd: string = date.getDate().toString();
	const month: string = months[date.getMonth()];
	const yyyy: string = date.getFullYear().toString();

	return `${month} ${dd}, ${yyyy}`;
};

export const createUID = (type: "LIST" | "ITEM") => `${type.toLowerCase()}-${v4()}`;

export const generateNewList = (listTitle: string): ITaskList => ({
	id: createUID("LIST"),
	listTitle,
	taskList: [],
});

// TODO: template builder for new list item
// export generateNewListItem = ()
