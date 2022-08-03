/** @format */

import http from "http";
import app from "./app";
import logger from "./utils/logger";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT, () =>
	logger.info(`Server running on http://localhost:${PORT}`),
);
