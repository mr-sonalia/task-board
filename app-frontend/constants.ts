import { ColumnSizes, ContainerSize } from "./types";

export const API_URL: string = "http://localhost:8080";

export const columnSizes: ColumnSizes = {
	xs: 12,
	sm: 6,
	md: 4,
	lg: 4,
	xl: 3,
};

export const containerSize: ContainerSize = "xl";

export const months: Record<number, string> = {
	0: "January",
	1: "February",
	2: "March",
	3: "April",
	4: "May",
	5: "June",
	6: "July",
	7: "August",
	8: "September",
	9: "October",
	10: "November",
	11: "December",
};

export const breakpoints: Record<string, number> = {
	xs: 300,
	sm: 660,
	md: 950,
	lg: 992,
	xl: 1200,
};
