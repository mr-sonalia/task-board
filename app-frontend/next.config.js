/** @type {import('next').NextConfig} */

module.exports = () => {
	const rewrites = () => {
		return [
			{
				destination: "http://localhost:8080",
				source: "/api",
			},
			{
				destination: "http://localhost:8080/board",
				source: "/api/board",
			},
			{
				destination: "http://localhost:8080/board/:id",
				source: "/api/board/:id",
			},
			{
				destination: "http://localhost:8080/board/:id/taskList",
				source: "/api/board/:id/taskList",
			},
		];
	};
	return {
		rewrites,
	};
};
