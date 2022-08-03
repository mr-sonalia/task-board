/** @format */

import methods from "../utils/for_testing";

describe("reverse", () => {
	test("reverse of react", () => {
		const result = methods.reverse("react");
		expect(result).toBe("tcaer");
	});
});
