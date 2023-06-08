const Block = require("./block");
const cryptoHash = require("./hash");
const GENESIS_DATA = require("./config");

describe("Block", () => {
	it("has a timestamp, lastHash, hash, and data", () => {
		const block = new Block({
			timestamp: 1,
			lastHash: "last-hash",
			hash: "hash",
			data: "test-data",
		});

		expect(block.timestamp).toEqual(1);
		expect(block.lastHash).toEqual("last-hash");
		expect(block.hash).toEqual("hash");
		expect(block.data).toEqual("test-data");
	});

	it("calculates a SHA-256 hash for block", () => {
		const timestamp = Date.now();
		const lastHash = "last-hash";
		const data = ["test", "test-data"];
		const hash = cryptoHash(timestamp, lastHash, data);

		const block = new Block({ timestamp, lastHash, data, hash });

		expect(block.calculateHash()).toEqual(hash);
	});

	it("creates a genesis block", () => {
		const genesisBlock = Block.genesisBlock();

		expect(genesisBlock instanceof Block).toBeTruthy();
		expect(genesisBlock.timestamp).toEqual(GENESIS_DATA.timestamp);
		expect(genesisBlock.lastHash).toEqual(GENESIS_DATA.lastHash);
		expect(genesisBlock.data).toEqual(GENESIS_DATA.data);
		expect(genesisBlock.hash).toEqual(
			cryptoHash(
				GENESIS_DATA.data,
				GENESIS_DATA.lastHash,
				GENESIS_DATA.timestamp
			)
		);
	});

	it("mines a new block given the last block and data", () => {
		const lastBlock = Block.genesisBlock();
		const data = ["mined data"];
		const minedBlock = Block.mineBlock({ lastBlock, data });

		expect(minedBlock instanceof Block).toBe(true);
		expect(minedBlock.lastHash).toEqual(lastBlock.hash);
		expect(minedBlock.data).toEqual(data);
		expect(minedBlock.hash).toEqual(
			cryptoHash(minedBlock.timestamp, lastBlock.hash, data)
		);
	});
});
