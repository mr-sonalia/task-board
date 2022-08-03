/** @format */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			PORT: string;
			MONGODB_PASSWORD: string;
			MONGODB_URI: string;
			MONGODB_TEST_URI: string;
		}
	}
}

export { };

