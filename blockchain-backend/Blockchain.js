const Block = require("./block");

class Blockchain {
	constructor() {
		this.chain = [Block.genesisBlock()];
	}

	getLastBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(data) {
		if (!data || data === "") {
			throw new Error("Cannot add block without data");
		} else {
			const newBlock = Block.mineBlock({
				lastBlock: this.getLastBlock(),
				data: data,
			});
			this.chain.push(newBlock);
			return newBlock;
		}
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash != currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.lastHash != previousBlock.hash) {
				return false;
			}
		}

		return true;
	}
}

module.exports = Blockchain;
