/** @type {import('next').NextConfig} */

module.exports = () => {
	const rewrites = () => {
		return [
			{
				destination: "http://localhost:4000/api",
				source: "/api",
			},
		];
	};
	return {
		rewrites,
	};
};
