const cryptoHash = require("./hash");

describe("cryptoHash()", () => {
	it("generates a SHA-256 hashed output", () => {
		expect(cryptoHash("Erik")).toEqual(
			"f166226706d234dbf22ef3eda3a666a9c6a6fb249c193dd38920cc18a953dfb1"
		);
	});
});

it("same hash with the same input in any order", () => {
	expect(cryptoHash("Oscar", "Erik", "Pelle")).toEqual(
		cryptoHash("Pelle", "Oscar", "Erik")
	);
});
