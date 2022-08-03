/** @format */

const color = {
	Reset: "\x1b[0m",
	FgRed: "\x1b[31m%s\x1b[0m",
	FgGreen: "\x1b[32m%s\x1b[0m",
	FgYellow: "\x1b[33m%s\x1b[0m",
	FgBlue: "\x1b[34m%s\x1b[0m",
};

const info = (...params: unknown[]) => {
	console.log(color.FgBlue, ...params);
};

const alert = (...params: unknown[]) => {
	console.log(color.FgYellow, ...params);
};

const success = (...params: unknown[]) => {
	console.log(color.FgGreen, ...params);
};

const error = (...params: unknown[]) => {
	console.error(color.FgRed, ...params);
};

const log = (...params: unknown[]) => {
	console.error(...params);
};

export default {
	info,
	error,
	alert,
	success,
};
