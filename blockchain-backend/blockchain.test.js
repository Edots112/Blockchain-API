const Blockchain = require("./blockchain");
const Block = require("./block");

describe("Blockchain", () => {
	it("starts with genesis block", () => {
		const blockchain = new Blockchain();

		expect(blockchain.chain[0]).toEqual(Block.genesisBlock());
	});

	it("adds a new block to the chain", () => {
		const blockchain = new Blockchain();
		const data = "test-data";
		blockchain.addBlock(data);

		expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
	});

	it("validates a valid chain", () => {
		const blockchain = new Blockchain();

		blockchain.addBlock("block-1");
		blockchain.addBlock("block-2");

		expect(blockchain.isChainValid()).toBe(true);
	});

	it("invalidates a changed chain", () => {
		const blockchain = new Blockchain();
		blockchain.addBlock("block-1");
		blockchain.chain.at(1).data = "Bad data";

		expect(blockchain.isChainValid()).toBe(false);
	});
});
