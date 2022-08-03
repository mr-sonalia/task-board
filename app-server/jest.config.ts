/** @format */

import type { InitialOptionsTsJest } from "ts-jest";

const config: InitialOptionsTsJest = {
	extensionsToTreatAsEsm: [".ts"],
	preset: "ts-jest",
	globals: {
		"ts-jest": {
			//ts-jest configuration goes here
			useESM: true,
		},
	},
	transform: {},
	verbose: true
};
export default config;
