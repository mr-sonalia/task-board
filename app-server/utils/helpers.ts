/** @format */

import bcrypt from "bcrypt";

export const generateTestPasswordHash = async (
	password: string,
): Promise<string> => {
	return await bcrypt.hash(password, +process.env.SALT_ROUNDS!);
};
